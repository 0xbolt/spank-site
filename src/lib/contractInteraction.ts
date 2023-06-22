import idl from "@/lib/idl.json";
import * as anchor from "@project-serum/anchor";
import * as spl from "@solana/spl-token";

import { BN } from "@project-serum/anchor";
import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  DEVNET_ENDPOINT,
  MAINNET_ENDPOINT,
  DEVNET_PROGRAM_ID,
  TOKEN_MINT_ADDRESS_DEVNET,
} from "./constants";
import { AnchorWallet } from "@solana/wallet-adapter-react";
import { toast } from "react-hot-toast";

function getConnection(cluster: string): Connection {
  if (cluster === "devnet") return new Connection(DEVNET_ENDPOINT, "confirmed");
  return new Connection(MAINNET_ENDPOINT, "confirmed");
}

const connection = getConnection("devnet");
const provider = (wallet: AnchorWallet) =>
  new anchor.AnchorProvider(connection, wallet, {
    preflightCommitment: "confirmed",
  });

const getProgram = (wallet: AnchorWallet) =>
  new anchor.Program(idl as anchor.Idl, DEVNET_PROGRAM_ID, provider(wallet));

async function getLotteryId(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const [trackerAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("global_tracker")],
    program.programId
  );
  const trackerAccountData = await program.account.trackerAccount.fetch(
    trackerAccount
  );
  const lotteryId = trackerAccountData.totalLotteryCount;
  return lotteryId - 1;
}

async function getTrackerAccount(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const [trackerAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("global_tracker")],
    program.programId
  );
  return trackerAccount;
}

async function getUserAccount(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const [user_account] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), wallet.publicKey.toBuffer()],
    program.programId
  );
  return user_account;
}

async function getLotteryAccount(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const lotteryId = await getLotteryId(wallet) + 1;
  const [lottery] = PublicKey.findProgramAddressSync(
    [Buffer.from("lottery"), new BN(lotteryId).toArrayLike(Buffer, "le", 2)],
    program.programId
  );
  return lottery;
}

async function createTracker(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const trackerAccount = await getTrackerAccount(wallet);
  const tx = await program.methods.createTracker().accounts({
    authority: wallet.publicKey,
    trackerAccount,
    systemProgram: SystemProgram.programId,
  });
  const sig = tx.rpc();
  toast.promise(sig, {
    loading: "Creating tracker...",
    success: "Tracker created!",
    error: "Error creating tracker",
  });
  const txid = await sig;
  console.log("Create Tracker Sig: ", txid);
}

async function createUser(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const userAccount = await getUserAccount(wallet);
  const trackerAccount = await getTrackerAccount(wallet);
  const tx = await program.methods.createUser().accounts({
    trackerAccount,
    userAccount: userAccount,
    authority: wallet.publicKey,
    systemProgram: SystemProgram.programId,
  });
  const sig = tx.rpc();
  toast.promise(sig, {
    loading: "Creating user...",
    success: "User created!",
    error: "Error creating user",
  });
  const txid = await sig;
  console.log("Create User Sig: ", txid);
}

async function createLottery(wallet: AnchorWallet) {
  const lotteryId = await getLotteryId(wallet);
  const program = getProgram(wallet);
  const trackerAccount = await getTrackerAccount(wallet);
  const lotteryAccount = await getLotteryAccount(wallet);
  const tx = await program.methods
    .createLottery(new anchor.BN(lotteryId))
    .accounts({
      authority: wallet.publicKey,
      lottery: lotteryAccount,
      trackerAccount,
      systemProgram: SystemProgram.programId,
    });
  const sig = tx.rpc();
  toast.promise(sig, {
    loading: "Creating lottery...",
    success: "Lottery created!",
    error: "Error creating lottery",
  });
  const txid = await sig;
  console.log("Create Lottery Sig: ", txid);
}

async function deposit(wallet: AnchorWallet, amount: number) {
  const program = getProgram(wallet);
  const lotteryId = await getLotteryId(wallet);
  const trackerAccount = await getTrackerAccount(wallet);
  const userAccount = await getUserAccount(wallet);
  const lotteryAccount = await getLotteryAccount(wallet);

  const from_ata = spl.getAssociatedTokenAddressSync(
    new anchor.web3.PublicKey(TOKEN_MINT_ADDRESS_DEVNET),
    wallet.publicKey,
    false
  );

  const to_ata = spl.getAssociatedTokenAddressSync(
    new anchor.web3.PublicKey(TOKEN_MINT_ADDRESS_DEVNET),
    lotteryAccount,
    true
  );

  console.log("Lottery ID: ", lotteryId);

  const tx = await program.methods
    .deposit(new anchor.BN(lotteryId), new anchor.BN(amount * 10 ** 9))
    .accounts({
      trackerAccount,
      mintAccount: TOKEN_MINT_ADDRESS_DEVNET,
      fromAta: from_ata,
      toAta: to_ata,
      userAccount: userAccount,
      lottery: lotteryAccount,
      signer: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    });
  const sig = tx.rpc();
  toast.promise(sig, {
    loading: "Depositing...",
    success: "Deposited!",
    error: "Error depositing",
  });
  const txid = await sig;
  console.log("Deposit Sig: ", txid);
}

async function selectWinner(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const lotteryId = await getLotteryId(wallet);
  const lotteryAccount = await getLotteryAccount(wallet);
  const sig = await program.methods
    .selectWinner(new anchor.BN(lotteryId))
    .accounts({
      lottery: lotteryAccount,
      authority: wallet.publicKey,
      systemProgram: SystemProgram.programId,
    });
  const tx = sig.rpc();
  toast.promise(tx, {
    loading: "Selecting winner...",
    success: "Winner selected!",
    error: "Error selecting winner",
  });
  const txid = await tx;
  console.log("Select Winner Sig: ", txid);
}

export { createUser, createTracker, createLottery, deposit, selectWinner };
