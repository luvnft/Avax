import React from "react";
import { Book, Shield, Rocket, Coins } from "lucide-react";
import Chatbot from "../components/ChatBot";

const Docs = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text">
          Documentation
        </h1>
        <p className="text-gray-400">Learn how to use the MemeVerse platform</p>
      </div>

      <div className="space-y-8">
        <section className="p-8 bg-white/5 backdrop-blur-md rounded-2xl">
          <div className="flex items-center mb-6 space-x-3">
            <Rocket className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold">Getting Started</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              A.MEMECO.TV is a decentralized platform for launching and trading
              memecoins on MemeSubnet. Follow these steps to get started:
            </p>
            <ol className="space-y-4 text-gray-300 list-decimal list-inside">
              <li>Connect your wallet to the MemeSubnet network</li>
              <li>Ensure you have AVAX for gas fees and trading</li>
              <li>Navigate to the Launch page to create your token</li>
              <li>Or visit the Trade page to start trading existing tokens</li>
            </ol>
          </div>
        </section>

        <section className="p-8 bg-white/5 backdrop-blur-md rounded-2xl">
          <div className="flex items-center mb-6 space-x-3">
            <Shield className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold">Security Features</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              Our platform includes several security features to protect users:
            </p>
            <ul className="space-y-4 text-gray-300 list-disc list-inside">
              <li>Anti-bot protection during token launches</li>
              <li>Automated liquidity locking</li>
              <li>Contract verification and audit requirements</li>
              <li>Maximum transaction and wallet limits</li>
            </ul>
          </div>
        </section>

        <section className="p-8 bg-white/5 backdrop-blur-md rounded-2xl">
          <div className="flex items-center mb-6 space-x-3">
            <Coins className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold">Trading Guide</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-300">
              Learn how to trade tokens effectively on our platform:
            </p>
            <ul className="space-y-4 text-gray-300 list-disc list-inside">
              <li>Use the Trade page to swap tokens</li>
              <li>Monitor token performance in Rankings</li>
              <li>Track your portfolio in Dashboard</li>
              <li>Earn rewards by providing liquidity</li>
            </ul>
          </div>
        </section>

        <section className="p-8 bg-white/5 backdrop-blur-md rounded-2xl">
          <div className="flex items-center mb-6 space-x-3">
            <Book className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-semibold">FAQ</h2>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-lg font-medium">
                How do I create a token?
              </h3>
              <p className="text-gray-300">
                Visit the Launch page, fill in your token details, and follow
                the guided process. You'll need AVAX for deployment and initial
                liquidity.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">What are the fees?</h3>
              <p className="text-gray-300">
                Trading fees are 0.3%, with 0.25% going to liquidity providers
                and 0.05% to the platform.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium">
                How do I earn rewards?
              </h3>
              <p className="text-gray-300">
                Provide liquidity to earn a share of trading fees, or
                participate in token launches to earn launch rewards.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Chatbot />
    </div>
  );
};

export default Docs;
