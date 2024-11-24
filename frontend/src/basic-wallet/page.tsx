"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Erc1155TokenBalance,
  Erc20TokenBalance,
  TransactionDetails,
} from "@avalabs/avacloud-sdk/models/components";
import { Erc721TokenBalance } from "@avalabs/avacloud-sdk/models/components/erc721tokenbalance";
import { Card } from "../components/Card";

export default function BasicWallet() {
  const { address } = useAccount();
  const [erc20Balances, setErc20Balances] = useState<Erc20TokenBalance[]>([]);
  const [erc721Balances, setErc721Balances] = useState<Erc721TokenBalance[]>(
    []
  );
  const [erc1155Balances, setErc1155Balances] = useState<Erc1155TokenBalance[]>(
    []
  );
  const [recentTransactions, setRecentTransactions] =
    useState<TransactionDetails>();
  const [activeTab, setActiveTab] = useState("nfts");

  const fetchERC20Balances = async (address: string) => {
    const blockResult = await fetch("api/balance?method=getBlockHeight");
    const blockNumber = await blockResult.json();
    const balanceResult = await fetch(
      "api/balance?method=listErc20Balances&address=" +
        address +
        "&blockNumber=" +
        blockNumber
    );
    const balances = await balanceResult.json();
    return balances as Erc20TokenBalance[];
  };

  const fetchERC721Balances = async (address: string) => {
    const result = await fetch(
      `api/wallet?method=listERC721Balances&address=${address}`
    );
    const balances = await result.json();
    return balances as Erc721TokenBalance[];
  };

  const fetchERC1155Balances = async (address: string) => {
    const result = await fetch(
      `api/wallet?method=listERC1155Balances&address=${address}`
    );
    const balances = await result.json();
    return balances as Erc1155TokenBalance[];
  };

  const fetchRecentTransactions = async (address: string) => {
    const result = await fetch(
      `api/wallet?method=listRecentTransactions&address=${address}`
    );
    const transactions = await result.json();
    return transactions as TransactionDetails;
  };

  useEffect(() => {
    if (address) {
      fetchERC20Balances(address).then(setErc20Balances);
      fetchERC721Balances(address).then(setErc721Balances);
      fetchERC1155Balances(address).then(setErc1155Balances);
      fetchRecentTransactions(address).then(setRecentTransactions);
    }
  }, [address]);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-secondary-300">
          Wallet Portfolio
        </h1>
        <div className="flex justify-center mb-8">
          <ConnectButton />
        </div>
      </motion.div>

      {address ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <motion.main
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-grow"
          >
            <div className="flex gap-4 mb-8">
              {["nfts", "erc20", "erc1155"].map((tab) => (
                <motion.button
                  key={tab}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                    activeTab === tab
                      ? "glass-button"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {tab.toUpperCase()}
                </motion.button>
              ))}
            </div>

            {activeTab === "nfts" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {erc721Balances.map((nft, index) => (
                  <motion.div
                    key={`${nft.address}-${nft.tokenId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="token-card"
                  >
                    {nft.metadata.imageUri && (
                      <img
                        src={nft.metadata.imageUri}
                        alt={nft.name}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-lg font-semibold mb-2">{nft.name}</h3>
                    <p className="text-sm text-white/60">#{nft.tokenId}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "erc20" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {erc20Balances.map((token, index) => (
                  <motion.div
                    key={token.address}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="token-card"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      {token.logoUri ? (
                        <img
                          src={token.logoUri}
                          alt={token.name}
                          className="w-12 h-12 rounded-full"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                          <span className="text-xl font-bold">
                            {token.symbol?.[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold">{token.name}</h3>
                        <p className="text-sm text-white/60">{token.symbol}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary-300">
                        {(
                          Number(token.balance) /
                          10 ** Number(token.decimals)
                        ).toLocaleString(undefined, {
                          maximumFractionDigits: 4,
                        })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "erc1155" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {erc1155Balances.map((token, index) => (
                  <motion.div
                    key={`${token.address}-${token.tokenId}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="token-card"
                  >
                    <h3 className="text-lg font-semibold mb-2">
                      {token.metadata?.name || `Token #${token.tokenId}`}
                    </h3>
                    <p className="text-2xl font-bold text-primary-300">
                      {token.balance}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.main>

          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-96"
          >
            <Card title="Recent Activity" className="sticky top-24">
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {activeTab === "nfts" &&
                  recentTransactions?.erc721Transfers?.map((tx) => (
                    <div key={tx.logIndex} className="transaction-item">
                      <div className="flex items-center gap-4">
                        {tx.erc721Token.metadata.imageUri && (
                          <img
                            src={tx.erc721Token.metadata.imageUri}
                            alt={tx.erc721Token.name}
                            className="w-12 h-12 rounded-lg"
                          />
                        )}
                        <div>
                          <p className="text-sm font-semibold">
                            {String(tx.from?.address) === address
                              ? "Sent"
                              : "Received"}
                          </p>
                          <p className="text-xs text-white/60">
                            {tx.erc721Token.name} #{tx.erc721Token.tokenId}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                {activeTab === "erc20" &&
                  recentTransactions?.erc20Transfers?.map((tx) => (
                    <div key={tx.logIndex} className="transaction-item">
                      <div className="flex items-center gap-4">
                        {tx.erc20Token.logoUri && (
                          <img
                            src={tx.erc20Token.logoUri}
                            alt={tx.erc20Token.name}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-semibold">
                            {String(tx.from?.address) === address
                              ? "Sent"
                              : "Received"}
                          </p>
                          <p className="text-xs text-white/60">
                            {(
                              Number(tx.value) /
                              10 ** Number(tx.erc20Token.decimals)
                            ).toLocaleString()}{" "}
                            {tx.erc20Token.symbol}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </motion.aside>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white/60"
        >
          <p className="text-xl">Connect your wallet to view your portfolio</p>
        </motion.div>
      )}
    </div>
  );
}
