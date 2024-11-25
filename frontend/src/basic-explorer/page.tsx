"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import {
  NativeTransaction,
  EvmBlock,
} from "@avalabs/avacloud-sdk/models/components";

import { AvaCloudSDK } from "@avalabs/avacloud-sdk";
import { get } from "http";
const avaCloudSDK = new AvaCloudSDK({
  apiKey: import.meta.env.VITE_AVACLOUD_API_KEY,
  chainId: "43114",
  network: "mainnet",
});

export default function BlockchainExplorer() {
  const [recentTransactions, setRecentTransactions] = useState<
    NativeTransaction[]
  >([]);
  const [recentBlocks, setRecentBlocks] = useState<EvmBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    const result =
      await avaCloudSDK.data.evm.transactions.listLatestTransactions({
        pageSize: 10,
      });
    const transactions: NativeTransaction[] = [];
    for await (const page of result) {
      transactions.push(...page.result.transactions);
      if (transactions.length >= 10) break;
    }
    return transactions;
  };

  const fetchRecentTransactions = async () => {
    const result = await getRecentTransactions();
    const transactions = result;
    return transactions as NativeTransaction[];
  };

  const fetchRecentBlocks = async () => {
    const result = await getRecentBlocks();
    const blocks = result;
    return blocks as EvmBlock[];
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [transactions, blocks] = await Promise.all([
          fetchRecentTransactions(),
          fetchRecentBlocks(),
        ]);
        setRecentTransactions(transactions);
        setRecentBlocks(blocks);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-secondary-300">
          Blockchain Explorer
        </h1>
        <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto">
          Monitor real-time blockchain activity
        </p>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <motion.div
            className="w-16 h-16 border-4 border-primary-300 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card title="Recent Transactions">
              <div className="space-y-4">
                {recentTransactions.map((tx) => (
                  <motion.div
                    key={tx.txHash}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-4 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white/80">
                          {tx.txHash.substring(0, 16)}...
                        </span>
                        <span className="text-xs text-white/60">
                          {Math.floor(
                            (Date.now() - tx.blockTimestamp * 1000) / 1000
                          )}
                          s ago
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-primary-300">
                          {(Number(tx.value) / 1e18).toFixed(4)} AVAX
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card title="Recent Blocks">
              <div className="space-y-4">
                {recentBlocks.map((block) => (
                  <motion.div
                    key={block.blockNumber}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass-card p-4 transition-all duration-300"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white/80">
                          Block #{block.blockNumber}
                        </span>
                        <span className="text-xs text-white/60">
                          {Math.floor(
                            (Date.now() - block.blockTimestamp * 1000) / 1000
                          )}
                          s ago
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-primary-300">
                          {block.txCount} txs
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      )}
    </div>
  );
}
