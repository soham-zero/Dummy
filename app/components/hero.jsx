"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import "./HeroSection.css"

const HeroSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Grid layout */}
      <div className="grid lg:grid-cols-2 gap-14 items-center" >
        {/* ==== LEFT : Branding & CTA ==== */}
        <div className="space-y-8" class="special-card">
          <div class="special-card">
            <h1 className="text-5xl lg:text-6xl font-extrabold text-black leading-tight">
            Compare<span className="text-blue-400">Fi</span>
          </h1>
          </div>

          <p className="text-2xl lg:text-3xl font-medium text-black/90">
            Your shortcut to{" "}
            <span className="text-green-400 font-semibold">
              smarter money moves
            </span>
          </p>

          <p className="text-lg text-black/70 max-w-xl">
            Discover, compare and choose the best financial products in
            seconds — no hidden fees, no jargon, just clarity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className="bg-blue-600 text-black px-8 py-4 rounded-lg text-lg font-semibold
              hover:bg-blue-700 transition-all transform hover:scale-105
              flex items-center justify-center"
            >
              Start Comparing
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>

            <Link
              href="/about"
              className="border-2 border-white/30 text-black px-8 py-4 rounded-lg
              text-lg font-semibold hover:border-blue-400 hover:text-blue-400
              transition-colors inline-flex items-center justify-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* ==== RIGHT : Animation ==== */}
        <div className="flex justify-center items-center relative">
          <div class="special-card">
            </div>
          <div class="honeycomb">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div> 
        </div>
    </div>
    </div>
  );
};

export default HeroSection;
