import React from 'react';
import { Twitter, MessageCircle, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t bg-black/50 backdrop-blur-md border-purple-500/20">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xl font-bold">AVAX.MEMECO.TV</h3>
            <p className="text-gray-400">
              The ultimate Avax launchpad for the Memeco.tv memeconomy.
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/launch" className="transition hover:text-purple-400">Launch Token</a></li>
              <li><a href="/trade" className="transition hover:text-purple-400">Trade</a></li>
              <li><a href="/rankings" className="transition hover:text-purple-400">Rankings</a></li>
              <li><a href="/docs" className="transition hover:text-purple-400">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/docs" className="transition hover:text-purple-400">Whitepaper</a></li>
              <li><a href="/docs" className="transition hover:text-purple-400">FAQ</a></li>
              <li><a href="/docs" className="transition hover:text-purple-400">Terms of Service</a></li>
              <li><a href="/docs" className="transition hover:text-purple-400">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-semibold">Tribe</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 transition hover:text-purple-400">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 transition hover:text-purple-400">
                <MessageCircle className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 transition hover:text-purple-400">
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-8 text-center text-gray-400 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} AVAX.MEMECO.TV. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;