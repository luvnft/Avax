"use server";
import { NextResponse } from "next/server";
import { AvaCloudSDK } from "@avalabs/avacloud-sdk";
import {
  NativeTransaction,
  EvmBlock,
} from "@avalabs/avacloud-sdk/models/components";

const avaCloudSDK = new AvaCloudSDK({
  apiKey: import.meta.env.VITE_AVACLOUD_API_KEY,
  chainId: "43114",
  network: "mainnet",
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const method = searchParams.get("method");
  try {
    let result;
    switch (method) {
      case "getRecentTransactions":
        result = await getRecentTransactions();
        break;
      case "getRecentBlocks":
        result = await getRecentBlocks();
        break;
      default:
        return NextResponse.json({ error: "Invalid method" }, { status: 400 });
    }
    return NextResponse.json(result);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const getRecentBlocks = async () => {
  const result = await avaCloudSDK.data.evm.blocks.getLatestBlocks({
    pageSize: 10,
  });
  const blocks: EvmBlock[] = [];
  for await (const page of result) {
    blocks.push(...page.result.blocks);
    if (blocks.length >= 10) break;
  }
  return blocks;
};

const getRecentTransactions = async () => {
  const result = await avaCloudSDK.data.evm.transactions.listLatestTransactions(
    {
      pageSize: 10,
    }
  );
  const transactions: NativeTransaction[] = [];
  for await (const page of result) {
    transactions.push(...page.result.transactions);
    if (transactions.length >= 10) break;
  }
  return transactions;
};