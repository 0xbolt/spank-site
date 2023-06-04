import idl from "@/lib/idl.json";
import * as anchor from "@project-serum/anchor";

import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import {
  DEVNET_ENDPOINT,
  MAINNET_ENDPOINT,
  DEVNET_PROGRAM_ID,
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

async function createTracker(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const [trackerAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("global_tracker")],
    program.programId
  );
  const tx = await program.methods.createTracker().accounts({
    authority: wallet.publicKey,
    trackerAccount,
    systemProgram: SystemProgram.programId,
  });
  const sig = tx.rpc({ skipPreflight: true });
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
  const [user_account] = PublicKey.findProgramAddressSync(
    [Buffer.from("user"), wallet.publicKey.toBuffer()],
    program.programId
  );
  const [trackerAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("global_tracker")],
    program.programId
  );
  console.log("Tracker Account: ", trackerAccount.toBase58());
  const tx = await program.methods.createUser().accounts({
    trackerAccount,
    userAccount: user_account,
    authority: wallet.publicKey,
    systemProgram: SystemProgram.programId,
  });
  const sig = tx.rpc({ skipPreflight: true });
  toast.promise(sig, {
    loading: "Creating user...",
    success: "User created!",
    error: "Error creating user",
  });
  const txid = await sig;
  console.log("Create User Sig: ", txid);
}

async function createLottery(wallet: AnchorWallet) {
  const program = getProgram(wallet);
  const [trackerAccount] = PublicKey.findProgramAddressSync(
    [Buffer.from("global_tracker")],
    program.programId
  );
  const [lottery] = PublicKey.findProgramAddressSync(
    [Buffer.from("lottery")],
    program.programId
  );
  const tx = await program.methods.createLottery().accounts({
    lottery,
    trackerAccount,
    authority: wallet.publicKey,
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

export { createUser, createTracker, createLottery };
