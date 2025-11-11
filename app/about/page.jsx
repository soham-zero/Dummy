'use client';

import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Image from 'next/image';
import Het from '../images/het.jpg';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fcfefb] text-[#0A0F2C] font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 flex justify-center relative overflow-hidden">
        <div className="w-[94%] max-w-7xl mx-auto px-10 text-center bg-gradient-to-b from-[#B1ED67]/30 to-white rounded-3xl p-14 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-[#e5e7eb] transition-all duration-700 hover:scale-[1.01] hover:shadow-[0_45px_80px_-20px_rgba(0,0,0,0.25)]">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Your Trusted Financial Comparison Platform
          </h1>
          <p className="text-lg sm:text-xl text-[#4B5563] max-w-3xl mx-auto">
            CompareFi is India’s most transparent financial comparison platform, designed to help you make smarter borrowing and investing decisions.
            We simplify the complex world of finance by offering real-time, unbiased comparisons for Loan Against Shares (LAS), Loan Against Mutual Funds (LAMF), and Margin Trading Facility (MTF).
          </p>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 flex justify-center">
        <div className="w-[94%] max-w-7xl mx-auto px-10 bg-gradient-to-b from-[#B1ED67]/20 to-white rounded-3xl p-14 shadow-[0_45px_80px_-20px_rgba(0,0,0,0.25)] border border-[#e5e7eb] transition-all duration-700">
          
          {/* Founder row */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-12 animate-slideUp">

            <div className="relative w-full rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] overflow-hidden">
              <Image
                // src={Het}
                alt="Founder"
                className="rounded-2xl object-cover w-full h-[400px]"
              />
            </div>

            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">About Het Doshi</h2>
              <p className="text-[#4B5563] text-lg leading-relaxed">
                I’m Het Doshi, a Chartered Accountant by qualification and an auditor by experience.
                I’ve worked across NBFCs, stock brokers, wealth managers & mutual funds — giving me a real view of how the financial industry works from inside.
              </p>

              <p className="text-right text-2xl mt-6 font-[cursive] text-[#0A0F2C]/90">
                – Het Doshi
              </p>
            </div>
          </div>

          {/* Long narrative paragraphs */}
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">About CompareFi</h2>

          <div className="space-y-6 text-[#4B5563] text-lg leading-relaxed animate-fadeIn">
            <p>
              At CompareFi, our mission is simple: to help everyday people make smarter financial decisions. This platform is born from a personal commitment to financial literacy and transparency — not from a profit driven agenda.
            </p>
            <p>
              Through CompareFi, I want to bridge the gap between financial products and the people they’re meant to serve. Whether it’s understanding a loan’s true cost, finding the right bank account, or comparing brokerage fees, my goal is to empower you with clear, unbiased information so you can make the best choice for your needs.
            </p>
            <p>
              This platform is completely bootstrapped — built with time, effort, and a desire to make a difference. There’s no funding, no flashy team, and no corporate agenda behind CompareFi. It’s just me, trying to make a small impact in a system that often feels stacked against the average consumer.
            </p>
            <p>
              If this helps even one person save money, avoid a bad decision, or feel more confident about their finances, it’s all been worth it.
            </p>
          </div>

        </div>
      </section>

     {/* VISION / MISSION */}
<section className="pb-28 flex justify-center">
  <div className="w-[94%] max-w-7xl mx-auto px-10 bg-gradient-to-b from-[#B1ED67]/20 to-white rounded-3xl p-14 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border border-[#e5e7eb] transition-all duration-700 animate-slideUp">
    
    <h2 className="text-3xl sm:text-4xl font-bold mb-8">Vision & Mission</h2>

    {/* Vision */}
    <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
    <p className="text-[#4B5563] text-lg leading-relaxed mb-12">
      To create a more financially literate and empowered society by providing clear, unbiased comparisons of financial products and services.
    </p>

  {/* Mission */}
<h3 className="text-2xl font-semibold mb-6">Our Mission</h3>

<div className="grid sm:grid-cols-2 gap-8">
  {[
    "To simplify the world of loans, bank accounts, and financial products for everyday consumers.",
    "To help individuals make informed financial choices that align with their goals and needs.",
    "To build trust through transparency, clarity, and honest insights.",
    "To make financial literacy accessible to everyone, not just a privileged few."
  ].map((item, idx) => (
    <div
      key={idx}
      className="group relative overflow-hidden bg-white p-7 rounded-2xl border border-[#e5e7eb]
                 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.12)] transition-all duration-500
                 hover:-translate-y-2 hover:shadow-[0_25px_55px_-12px_rgba(0,0,0,0.22)] hover:border-[#B1ED67]"
    >
      {/* subtle green glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500
                      bg-gradient-to-br from-[#B1ED67]/40 to-transparent blur-2xl"></div>

      {/* text content */}
      <div className="relative z-10 flex gap-3 items-start">
        <div className="mt-1 w-3 h-3 rounded-full bg-[#FF5732] flex-shrink-0"></div>
        <p className="text-[#4B5563] text-lg leading-relaxed">
          {item}
        </p>
      </div>
    </div>
  ))}
</div>

  </div>
</section>


      <Footer />
    </div>
  );
}
