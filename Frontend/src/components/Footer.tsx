"use client";

import { Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1E293B] text-white ">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
       
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-2xl font-bold text-[#3B82F6]">Visual Product Matcher</h2>
          <p className="mt-2 text-gray-300 text-sm text-center md:text-left">
            AI-powered search to find the perfect product instantly.
          </p>
        </div>

       
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-[#3B82F6] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA] transition">
                <ExternalLink size={16} /> Home
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA] transition">
                <ExternalLink size={16} /> Upload Image
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA] transition">
                <ExternalLink size={16} /> Browse URL
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-2 hover:text-[#60A5FA] transition">
                <ExternalLink size={16} /> Documentation
              </a>
            </li>
          </ul>
        </div>

     
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-[#3B82F6] mb-4">Contact</h3>
          <p className="flex items-center gap-2 text-gray-300 text-sm hover:text-[#60A5FA] transition">
            <Mail size={16} /> fatimazoya806@gmail.com
          </p>
          <p className="mt-2 text-gray-400 text-xs">PSIT Kanpur</p>
        </div>

 
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-semibold text-[#3B82F6] mb-4">About</h3>
          <p className="text-gray-300 text-sm">
            Developed by <strong>Zoya Fatima</strong> as part of an assignment for <strong>Unthinkable Solutions – Daffodils</strong>.
          </p>
          <p className="mt-4 text-gray-500 text-xs">© {new Date().getFullYear()} Zoya Fatima</p>
        </div>
      </div>

   
      <div className="mt-10 border-t border-gray-700"></div>

      {/* Footer bottom text */}
      <div className="text-center text-gray-400 text-xs mt-4">
        Designed with ❤️ 
      </div>
    </footer>
  );
}


