import React from "react";
import { Rocket, Coins, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AvalancheScene from "../components/AvalancheScene";
import CustomCursor from "../components/CustomCursor";
import Chatbot from "../components/ChatBot";

const Home = () => {
  return (
    <>
      <CustomCursor />
      <AvalancheScene />
      <div className="relative space-y-20">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-5xl font-bold text-transparent md:text-7xl bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text">
              Launch Your Memecoin
            </h1>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300">
              The most advanced and secure platform for launching the next
              generation of memecoins on MemeSubnet.
            </p>
            <div className="flex items-center justify-center mb-4">
              <img
                src="https://cryptologos.cc/logos/avalanche-avax-logo.svg?v=035"
                alt="Avalanche Logo"
                className="w-8 h-8 mr-2"
              />
              <span className="text-lg font-medium text-gray-300">
                Powered by Avalanche
              </span>
            </div>
            <div className="flex flex-col justify-center gap-4 mt-10 sm:flex-row">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/launch"
                  className="px-8 py-3 font-medium transition rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
                >
                  Launch Token
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/marketplace"
                  className="px-8 py-3 font-medium transition rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20"
                >
                  Start Trading
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          <div className="p-6 text-center bg-white/5 backdrop-blur-md rounded-2xl">
            <motion.h3
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-2 text-3xl font-bold text-purple-400"
            >
              $1.2M+
            </motion.h3>
            <p className="text-gray-400">Total Value Locked</p>
          </div>
          <div className="p-6 text-center bg-white/5 backdrop-blur-md rounded-2xl">
            <motion.h3
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-2 text-3xl font-bold text-purple-400"
            >
              250+
            </motion.h3>
            <p className="text-gray-400">Tokens Launched</p>
          </div>
          <div className="p-6 text-center bg-white/5 backdrop-blur-md rounded-2xl">
            <motion.h3
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-2 text-3xl font-bold text-purple-400"
            >
              10K+
            </motion.h3>
            <p className="text-gray-400">Active Users</p>
          </div>
        </motion.section>

        {/* Features Section */}
        <section className="py-20">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-12 text-3xl font-bold text-center"
          >
            Why Choose A.MEMECO.TV?
          </motion.h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Rocket,
                title: "Easy Launch",
                desc: "Launch your token in minutes with our intuitive interface.",
              },
              {
                icon: Shield,
                title: "Secure Platform",
                desc: "Built on MemeSubnet with advanced security features.",
              },
              {
                icon: Coins,
                title: "Native Liquidity",
                desc: "Access to built-in liquidity pools for instant trading.",
              },
              {
                icon: Zap,
                title: "Fast Trading",
                desc: "Lightning-fast transactions with minimal fees.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white/5 backdrop-blur-md rounded-2xl"
              >
                <feature.icon className="w-12 h-12 mb-4 text-purple-400" />
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-20 text-center"
        >
          <div className="p-12 bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-3xl">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Launch Your Token?
            </h2>
            <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300">
              Join thousands of successful projects launched on MemeVerse.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/launch"
                className="inline-block px-8 py-3 font-medium transition rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90"
              >
                Get Started Now
              </Link>
            </motion.div>
          </div>
        </motion.section>
        <Chatbot />
      </div>
    </>
  );
};

export default Home;
