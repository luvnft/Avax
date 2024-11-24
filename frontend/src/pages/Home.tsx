import React from 'react';
import { Rocket, Coins, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Launch Your Meme Token
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          The most advanced and secure platform for launching the next generation of meme tokens on MemeSubnet.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/launch" className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-medium hover:opacity-90 transition">
            Launch Token
          </Link>
          <Link to="/trade" className="bg-white/10 backdrop-blur-md px-8 py-3 rounded-full font-medium hover:bg-white/20 transition">
            Start Trading
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-400 mb-2">$1.2M+</h3>
          <p className="text-gray-400">Total Value Locked</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-400 mb-2">250+</h3>
          <p className="text-gray-400">Tokens Launched</p>
        </div>
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 text-center">
          <h3 className="text-3xl font-bold text-purple-400 mb-2">10K+</h3>
          <p className="text-gray-400">Active Users</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose MemeVerse?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6">
            <Rocket className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Launch</h3>
            <p className="text-gray-400">Launch your token in minutes with our intuitive interface.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6">
            <Shield className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
            <p className="text-gray-400">Built on MemeSubnet with advanced security features.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6">
            <Coins className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Native Liquidity</h3>
            <p className="text-gray-400">Access to built-in liquidity pools for instant trading.</p>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6">
            <Zap className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Trading</h3>
            <p className="text-gray-400">Lightning-fast transactions with minimal fees.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center py-20">
        <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-md rounded-3xl p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Token?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful projects launched on MemeVerse.
          </p>
          <Link to="/launch" className="bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-3 rounded-full font-medium hover:opacity-90 transition inline-block">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;