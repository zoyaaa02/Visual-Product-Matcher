

"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-[#507DBC] to-[#A1C6EA] fixed top-0 left-0 w-full shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
     
          <span className="font-bold text-white text-lg sm:text-xl md:text-2xl">
            Visual Product Matcher
          </span>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <a href="#" className="hover:text-yellow-300 transition">Home</a>
            <a href="#" className="hover:text-yellow-300 transition">Upload</a>
            <a href="#" className="hover:text-yellow-300 transition">Browse URL</a>
            <a href="#" className="hover:text-yellow-300 transition">Documentation</a>

            <a
              href="https://github.com/zoyaaa02/Virtual-Product-Matcher.git"
              target="_blank"
              className="ml-4 flex items-center bg-white text-[#507DBC] px-3 py-1 rounded-lg shadow hover:bg-[#507DBC] hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.13 3.33 9.48 7.94 11.01.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.23.7-3.9-1.55-3.9-1.55-.53-1.33-1.3-1.68-1.3-1.68-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.21 1.78 1.21 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.74-1.56-2.57-.29-5.28-1.28-5.28-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.03 11.03 0 0 1 5.8 0c2.21-1.49 3.18-1.18 3.18-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.8 1.07.8 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.21.68.8.56 4.61-1.53 7.94-5.88 7.94-11.01C23.5 5.73 18.27.5 12 .5z"/>
              </svg>
              GitHub
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(true)}>
              <Menu className="text-white" size={28} />
            </button>
          </div>
        </div>
      </div>

      {/* Fullscreen Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-gradient-to-br from-[#507DBC] to-[#A1C6EA] flex flex-col items-center justify-center z-50"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={32} />
            </button>

            {/* Nav Links */}
            <div className="flex flex-col space-y-8 text-2xl font-semibold text-white">
              <a href="#" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Home</a>
              <a href="#" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Upload</a>
              <a href="#" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Browse URL</a>
              <a href="#" className="hover:text-yellow-300" onClick={() => setIsOpen(false)}>Documentation</a>
            </div>

            {/* GitHub Button (mobile fullscreen) */}
            <a
              href="https://github.com/your-repo"
              target="_blank"
              className="mt-12 flex items-center bg-white text-[#507DBC] px-5 py-2 rounded-lg shadow hover:bg-[#507DBC] hover:text-white transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="mr-2"
              >
                <path d="M12 .5C5.73.5.5 5.73.5 12.02c0 5.13 3.33 9.48 7.94 11.01..."/>
              </svg>
              GitHub
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}



