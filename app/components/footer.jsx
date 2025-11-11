'use client';

import React from 'react';
import logo from '../images/logo (3).png';
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-[#F2FFE1] py-12 border-t border-[#B1ED67]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              {/* Logo with white background */}
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white p-1">
                <Image
                  src={logo}
                  alt="CompareFi Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-[#B1ED67]">CompareFi</span>
            </div>
            <p className="text-[#F2FFE1]/80 leading-relaxed">
              Compare right Chose right
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold mb-4 text-[#B1ED67]">Products</h4>
            <ul className="space-y-2 text-[#F2FFE1]/80">
              <li>
                <a href="/products/LAS" className="hover:text-[#B1ED67] transition-colors">
                  Loan Against Shares (LAS)
                </a>
              </li>
              <li>
                <a href="/products/lamf" className="hover:text-[#B1ED67] transition-colors">
                  Loan Against Mutual Funds (LAMF)
                </a>
              </li>
              <li>
                <a href="/products/mtf" className="hover:text-[#B1ED67] transition-colors">
                  Margin Trading Facility (MTF)
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-[#B1ED67]">Company</h4>
            <ul className="space-y-2 text-[#F2FFE1]/80">
              <li><a href="/about" className="hover:text-[#B1ED67] transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-[#B1ED67] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-[#B1ED67]">Support</h4>
            <ul className="space-y-2 text-[#F2FFE1]/80">
              <li><a href="/help" className="hover:text-[#B1ED67] transition-colors">Contact Us</a></li>
              <li><a href="/privacy" className="hover:text-[#B1ED67] transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-[#B1ED67] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#B1ED67]/20 mt-8 pt-8 text-center text-[#F2FFE1]/70">
          <p>&copy; 2025 CompareFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
