import { Bot } from 'lucide-react';
import React from 'react';

function Footer() {
  return (
    <footer className="w-full bg-black/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-30 py-10 max-w-4xl mx-auto">
          <div className="text-center lg:text-left">
            <a href="#" className="flex justify-center lg:justify-start items-center gap-2 mb-6">
              <Bot className="w-8 h-8 text-indigo-400" />
              <span className="text-2xl font-bold text-white">NeuroNote</span>
            </a>
            <p className="py-8 text-sm text-gray-400 max-w-md">
              Boost team productivity with Meeting Bot—AI-powered <br /> meeting notes and instant task sharing, all in one place.
            </p>
            <a href="#" className="py-2.5 px-5 h-9 inline-block w-fit bg-blue-600 rounded-full shadow-sm text-xs text-white transition-all duration-500 hover:bg-blue-700">
              Contact us
            </a>
          </div>
          <div className="text-center lg:text-left">
            <h4 className="text-lg text-white font-medium mb-7">Links</h4>
            <ul className="text-sm transition-all duration-500">
              <li className="mb-6"><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li className="mb-6"><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li className="mb-6"><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
            </ul>
          </div>
        </div>
        <div className="py-7 border-t border-gray-800">
          <div className="flex items-center justify-center">
            <span className="text-sm text-gray-400">&copy; {new Date().getFullYear()} NeuroNote. Made with ❤️ for better meetings.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;