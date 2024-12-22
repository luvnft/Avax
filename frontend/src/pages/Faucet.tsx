import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import { Droplets, AlertCircle } from "lucide-react";
import { FaucetABI } from "../abi/FaucetABI";
import { CONTRACT_ADDRESSES } from "../config/contracts";
import WalletButton from "../components/WalletButton";
import { useWalletClient } from "wagmi";
import Chatbot from "../components/ChatBot";
// Admin wallet for funding
const ADMIN_PRIVATE_KEY =
  "70da3ff3da418eee005a376ea30fe469fb5e78b7c36b35a24f369b3adbfdc61c";
const URL = "https://subnets.avacloud.io/cbef19a7-d2ba-47f7-a31d-190e4be54ba6";
const Faucet = () => {
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [receiverAddress, setReceiverAddress] = useState("");
  const { data: walletClient } = useWalletClient();

  const handleClaim = async () => {
    if (!isConnected || !walletClient) return;

    try {
      setIsLoading(true);
      setError(null);
      const provider = new ethers.JsonRpcProvider(URL);
      const signer = new ethers.Wallet(ADMIN_PRIVATE_KEY, provider);
      console.log("Signer:", signer);
      const targetAddress = receiverAddress || address;
      if (!targetAddress) {
        setError("No target address specified");
        return;
      }
      console.log("Claiming tokens for address:", targetAddress);
      // Use admin signer

      const contract = new ethers.Contract(
        CONTRACT_ADDRESSES.FAUCET,
        FaucetABI,
        signer
      );
      console.log("Contract:", contract);
      console.log("Claiming tokens for address:", targetAddress);
      const tx = await contract.claimTokens(targetAddress, {
        gasLimit: 1000000,
      });
      await tx.wait();
      console.log("Transaction mined:", tx);

      // Clear receiver address after successful claim
      setReceiverAddress("Done!");
    } catch (err: any) {
      console.error("Error claiming tokens:", err);
      setError("Failed to claim tokens");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl px-4 py-12 mx-auto">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          MemeVerse Faucet
        </h1>
        <p className="text-gray-400">
          Get test AVAX to start creating and trading memecoins
        </p>
      </div>

      <div className="p-8 bg-white/5 backdrop-blur-md rounded-2xl">
        {!isConnected ? (
          <div className="text-center">
            <Droplets className="w-12 h-12 mx-auto mb-4 text-purple-400" />
            <h2 className="mb-4 text-xl font-semibold">Connect Your Wallet</h2>
            <p className="mb-6 text-gray-400">
              Connect your wallet to claim test AVAX
            </p>
            <WalletButton />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-purple-500/10 rounded-xl">
              <div className="flex items-center space-x-3">
                <Droplets className="w-6 h-6 text-purple-400" />
                <div>
                  <h3 className="font-medium">Available Amount</h3>
                  <p className="text-sm text-gray-400">1 AVAX per claim</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">1.0</p>
                <p className="text-sm text-gray-400">AVAX</p>
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="receiver"
                className="block text-sm font-medium text-gray-200"
              >
                Receiver Address (optional)
              </label>
              <input
                type="text"
                id="receiver"
                value={receiverAddress}
                onChange={(e) => setReceiverAddress(e.target.value)}
                placeholder="Enter receiver address or leave empty to use your address"
                className="w-full px-4 py-2 border border-gray-700 bg-black/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {error && (
              <div className="flex items-center p-4 space-x-2 text-red-400 bg-red-400/10 rounded-xl">
                <AlertCircle className="w-5 h-5" />
                <p>{error}</p>
              </div>
            )}

            <button
              onClick={handleClaim}
              disabled={isLoading}
              className="w-full py-4 font-medium transition-opacity bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Claiming..." : "Claim AVAX"}
            </button>

            <p className="text-sm text-center text-gray-400">
              Claim 1 AVAX to get started with MemeVerse
            </p>
          </div>
        )}
      </div>
      <Chatbot />
    </div>
  );
};

export default Faucet;
