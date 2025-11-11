'use client';
import Image from 'next/image';
import globe from './images/globe.png';
import pc from './images/pc.png';
import TiltedCard from '@/components/TiltedCard'; 
import BlurText from "@/components/BlurText";
import { DollarSign, PieChart, BarChart } from "lucide-react";
import { Link as ScrollLink } from 'react-scroll';

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

import SpotlightCard from './components/SpotlightCard.jsx'; // Import the SpotlightCard component from './components/SpotlightCard';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { motion } from 'framer-motion';
import { Briefcase, LineChart, BarChart3, Shield, CreditCard, TrendingUp, Sparkles } from 'lucide-react';
import DisplayCards from "@/components/ui/display-cards";
import "./globals.css";
import CompareProductsTable from "./components/CompareProductsTable";

// ShadCN components
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { TooltipProvider } from '@/components/ui/tooltip';

// Hero cards
const defaultCards = [
  {
    icon: <Sparkles className="size-4 text-black" />,
    title: "LAS",
    description: "Discover amazing content",
    date: "Just now",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
    className:
      "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-6 text-black" />,
    title: "LAMF",
    description: "Trending this week",
    date: "2 days ago",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
    className:
      "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
  },
  {
    icon: <Sparkles className="size-4 text-black" />,
    title: "MTF",
    description: "Latest updates and features",
    date: "Today",
    iconClassName: "text-blue-500",
    titleClassName: "text-[#FF5732]",
    className:
      "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
  },
];

// Products data
const PRODUCTS = [
  {
    id: 'las',
    title: 'Loan Against Securities (LAS)',
    blurb: 'Unlock liquidity from your portfolio without selling core holdings.',
    bullets: ['Borrow up to 70% of eligible securities', 'Minimal documentation', 'Flexible repayment schedules'],
    icon: <Briefcase className="w-6 h-6" />,
    color: 'from-emerald-400 to-emerald-600',
    metrics: [
      { name: 'Liquidity', value: 80, color: '#10B981' },
      { name: 'Cost', value: 40, color: '#34D399' },
      { name: 'Complexity', value: 30, color: '#6EE7B7' },
      { name: 'Turnaround', value: 70, color: '#A7F3D0' },
    ],
  },
  {
    id: 'lamf',
    title: 'Loan Against Mutual Funds (LAMF)',
    blurb: 'Quick cash against mutual investments — no redemption required.',
    bullets: ['Instant approval for qualifying funds', 'No exit-loads', 'Linked to NAVs for simplicity'],
    icon: <LineChart className="w-6 h-6" />,
    color: 'from-pink-400 to-pink-600',
    metrics: [
      { name: 'Liquidity', value: 70, color: '#F472B6' },
      { name: 'Cost', value: 50, color: '#F9A8D4' },
      { name: 'Complexity', value: 35, color: '#FBCFE8' },
      { name: 'Turnaround', value: 80, color: '#FEE2E2' },
    ],
  },
  {
    id: 'mtf',
    title: 'Margin Trading Facility (MTF)',
    blurb: 'Amplify buying power with controlled leverage for active traders.',
    bullets: ['Leverage up to 4x', 'Transparent interest & margin calls', 'Real-time risk monitoring'],
    icon: <BarChart3 className="w-6 h-6" />,
    color: 'from-indigo-400 to-indigo-600',
    metrics: [
      { name: 'Liquidity', value: 60, color: '#6366F1' },
      { name: 'Cost', value: 30, color: '#818CF8' },
      { name: 'Complexity', value: 60, color: '#A5B4FC' },
      { name: 'Turnaround', value: 50, color: '#C7D2FE' },
    ],
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const [parallaxIcons, setParallaxIcons] = useState([]);

  // Create multiple floating icons for parallax effect
  useEffect(() => {
    const iconsData = [Shield, CreditCard, TrendingUp];
    const NUM_ICONS = 15;

    const icons = Array.from({ length: NUM_ICONS }).map((_, i) => {
      const Icon = iconsData[i % iconsData.length];
      return {
        Icon,
        id: `${Icon.name}-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 30 + Math.random() * 50,
        color: ['text-emerald-300','text-pink-300','text-indigo-300'][i % 3],
        speed: 0.1 + Math.random() * 0.4,
        floatOffset: Math.random() * 20,
        floatSpeed: 1 + Math.random() * 1.5
      };
    });

    setParallaxIcons(icons);
  }, []);

  const features = ["Transparent Comparisons", "Independent & Unbiased", "Smart, Simple Insights"];

  const handleMouseMove = (e) => {
    parallaxIcons.forEach(icon => {
      const el = document.getElementById(icon.id);
      if (el) {
        const moveX = (e.clientX - window.innerWidth / 2) * icon.speed;
        const moveY = (e.clientY - window.innerHeight / 2) * icon.speed;
        el.style.transform = `translate(${moveX}px, ${moveY + Math.sin(Date.now()/1000*icon.floatSpeed)*icon.floatOffset}px)`;
      }
    });
  };

  return (
    <TooltipProvider>
      <div
        className="min-h-screen flex flex-col bg-slate-50 text-slate-900 overflow-x-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Navbar */}
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4 pt-4">
          <Navbar />
        </div>

        <main className="flex-grow bg-[#fcfefb]">

          {/* HERO SECTION */}
          <section className="relative flex items-center justify-center min-h-[85vh] bg-white bg-opacity-0 overflow-hidden px-4 sm:px-6 lg:px-10" >
            {/* Background noise layer */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-100 mix-blend-overlay pointer-events-none"></div>

            {/* Glass Card */}
            <motion.div
              className="w-full justify-center items-center flex flex-col"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <SpotlightCard className="relative z-10 w-[90%] max-w-full rounded-3xl   min-h-[70vh] bg-gradient-to-b from-[#b8ff62] via-white to-[#ffffff]
 backdrop-blur-xl shadow-2xl sm:p-10 md:p-14 lg:p-20 flex flex-col md:flex-row mt-[7%] mb-[7%] gap-10 md:gap-14 items-center justify-center hover:drop-shadow-2xl
           hover:scale-102 transition-all duration-700 
 border-none
           p-6 will-change-transform "  spotlightColor="rgba(255,255,255,0.3)">
              {/* LEFT */}
              <div className="flex-1 text-center md:text-left space-y-5 sm:space-y-6 lg:space-y-8 pl-20">
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
                  >
                   </motion.h1>

                  {/* <TextType 
                    text={["CompareFi"]}
                    typingSpeed={75}
                    pauseDuration={1500}
                    showCursor={true}
                    cursorCharacter="|"
                    className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]'
                  />
                  </motion.h1> */}

                  <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.7, ease: 'easeOut' }}
                  >
                    <BlurText
                      text="CompareFi"
                      delay={80}
                      animateBy="words" 
                      direction="top" 
                      onAnimationComplete={handleAnimationComplete} 
                      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-black tracking-tight leading-tight drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]"
                    />
                  </motion.h1>
                <motion.h2
                  className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-black"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
                >
                  <BlurText
                    text="Compare Right Choose Right"
                    delay={80}
                    animateBy="words"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-medium text-black"
                  />
                </motion.h2>


                <motion.p
                  className="text-sm sm:text-base md:text-lg text-black max-w-md mx-auto md:mx-0 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.6, ease: 'easeOut' }}
                >
                  <BlurText
                    text="Compare and understand financial products across the market from investments to loans and beyond. Make informed, confident decisions backed by data and AI-driven insights. "
                    delay={5}
                    animateBy="word"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-sm sm:text-base md:text-lg text-black max-w-md mx-auto md:mx-0 leading-relaxed"
                  />
                </motion.p>


                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
                >
                  <Button
                    size="lg"
                    className="bg-[#fc5732] hover:bg-[#fc5732] shadow-inner-white-500 text-white rounded-2xl px-6 sm:px-8 md:px-10 py-4 sm:py-5 md:py-6 text-base sm:text-lg shadow-lg shadow-blue-500/20 transition-transform hover:scale-105 duration-300"
                  >
                    <ScrollLink
                      to="compare"        // ID of the section
                      smooth={true}        // Smooth scroll
                      duration={600}       // Scroll duration in ms
                      offset={-100} 
                    >
                      Start Comparing
                    </ScrollLink>
                  </Button>
                </motion.div>
              </div>

              {/* RIGHT */}
              <motion.div
                className="flex-1 flex justify-center items-center w-full"
                i initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: -20 }} // 👈 lifts it up slightly
                  transition={{ delay: 0.5, duration: 0.7 }}
              >
                <div className="flex w-full max-w-2xl sm:max-w-3xl md:max-w-4xl lg:max-w-5xl items-center justify-center py-10 sm:py-14 md:py-20 ">
                  <DisplayCards cards={defaultCards} />
                </div>
              </motion.div>
              </SpotlightCard>
            </motion.div>
          </section>

          {/* PRODUCT HIGHLIGHTS */}
   <section id="featured" className="w-full bg-[#EEF1FA] bg-opacity-0 py-20 mx-5 px-10 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  {/* Left Section */}
  <div className="lg:w-1/3 mb-10 lg:mb-0 ml-10">
    <h2 className="text-4xl font-extrabold text-[#0A0F2C] mb-6 leading-tight">
      Product Highlights
    </h2>
    <a
      href="/products" // <-- Link to the page showing all products
      className="text-[#0A0F2C] font-medium underline underline-offset-4 hover:text-blue-600 transition"
    >
      View All
    </a>
  </div>

  {/* Right Section (Cards Grid) */}
  <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mr-10">
{/* LAS Card */}
<a href="/products/las" className="card4 group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer">
  <div className="flex items-center space-x-4">
    {/* Icon on the left */}
    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#FF5732]/20 rounded-full group-hover:bg-[#FF5732]/30 transition-colors">
      <DollarSign className="w-6 h-6 text-[#FF5732] group-hover:text-white" />
    </div>
    {/* Text */}
    <div>
      <p className="text1-title text-xl font-semibold text-[#0A0F2C] group-hover:text-black transition-colors">LAS</p>
      <p className="text1-body text-gray-600 mt-1">Loan Against Shares</p>
    </div>
  </div>
  <button className="card4-button mt-4 bg-[#FF5732] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all">More Info</button>
</a>

{/* LAMF Card */}
<a href="/products/lamf" className="card4 group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer">
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#FF5732]/20 rounded-full group-hover:bg-[#FF5732]/30 transition-colors">
      <PieChart className="w-6 h-6 text-[#FF5732] group-hover:text-white" />
    </div>
    <div>
      <p className="text1-title text-xl font-semibold text-[#0A0F2C] group-hover:text-black transition-colors">LAMF</p>
      <p className="text1-body text-gray-600 mt-1">Loan Against Mutual Funds</p>
    </div>
  </div>
  <button className="card4-button mt-4 bg-[#FF5732] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all">More Info</button>
</a>

{/* MTF Card */}
<a href="/products/mtf" className="card4 group relative overflow-hidden rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer">
  <div className="flex items-center space-x-4">
    <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[#FF5732]/20 rounded-full group-hover:bg-[#FF5732]/30 transition-colors">
      <BarChart className="w-6 h-6 text-[#FF5732] group-hover:text-white" />
    </div>
    <div>
      <p className="text1-title text-xl font-semibold text-[#0A0F2C] group-hover:text-black transition-colors">MTF</p>
      <p className="text1-body text-gray-600 mt-1">Margin Trading Facility</p>
    </div>
  </div>
  <button className="card4-button mt-4 bg-[#FF5732] hover:bg-black text-white font-medium py-2 px-4 rounded-lg transition-all">More Info</button>
</a>

</div>
</section>


{/* COMPARE PRODUCTS */}
{/* COMPARE PRODUCTS */}

<section id="compare" className="relative flex justify-center items-center mb-[2%] pb-[5%] mt-[2%] min-h-[80vh] overflow-hidden px-6 lg:px-10 bg-opacity-0">
  {/* Subtle noise/background */}
  <div className="absolute inset-0 bg-white bg-opacity-0 pointer-events-none"></div>

  {/* Glass card container */}
  <SpotlightCard
    className="relative z-10 w-[90%] rounded-3xl bg-white backdrop-blur-lg p-10 sm:p-14 flex flex-col drop-shadow-2xl shadow-2xl border-none "
    spotlightColor="rgba(177,237,103,0)"
  >
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center text-black">
        Compare Products
      </h2>

      <Tabs defaultValue="las">
        <TabsList className="mb-10">
          {PRODUCTS.map((p) => (
            <TabsTrigger
              key={p.id}
              value={p.id}
              className={`
                text-lg sm:text-xl px-6 sm:px-8 py-3 sm:py-4 rounded-xl whitespace-nowrap transition font-bold
                focus-visible:ring-4 focus-visible:ring-emerald-400
                data-[state=active]:bg-gradient-to-t from-white to-[#B1ED67]
                data-[state=active]:text-black
                data-[state=active]:drop-shadow-2xl
              `}
            >
              {p.title.split('(')[0].trim()}
            </TabsTrigger>
          ))}
        </TabsList>

        {PRODUCTS.map((p) => (
          <TabsContent key={p.id} value={p.id}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-start text-center md:text-left pt-8 pl-2">
                {/* Left Info */}
                <div>
                  <h4 className="text-2xl font-semibold text-[#0A0F2C]">
                    <BlurText
                      text={p.title}
                      delay={50}
                      animateBy="words"
                      direction="top"
                      onAnimationComplete={handleAnimationComplete}
                      className="text-4xl font-bold text-[#0A0F2C]"
                    />
                  </h4>

                  <BlurText
                    text={p.blurb}
                    delay={150}
                    animateBy="words"
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-xl text-black mt-5 leading-relaxed"
                  />

                  <ul className="mt-8 text-lg text-slate-600 space-y-4">
                    {p.bullets.map((b, i) => (
                      <li key={i}>
                        <BlurText
                          text={`• ${b}`}
                          delay={50 + i * 5}
                          animateBy="words"
                          direction="bottom"
                          onAnimationComplete={handleAnimationComplete}
                          className="text-lg text-slate-700"
                        />
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 flex flex-col sm:flex-row gap-6 justify-center md:justify-start">
                    <Link href={`/products/${p.id}`}>
                      <Button size="lg" className="text-lg px-8 py-4 bg-[#FF5732] hover:bg-[#FF5732]">
                        Deep Dive
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Metrics → Firebase Table */}
                <div>
                  <CompareProductsTable productType={p.id} />
                </div>
              </div>
            </motion.div>
          </TabsContent>
        ))}
      </Tabs>
    </motion.div>
  </SpotlightCard>
</section>


          {/* FEATURES SECTION */}
          <section className="w-full bg-[#F9FAFB] bg-opacity-0 py-15 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  <section className="w-full bg-[#F9FAFB]  bg-opacity-0 py-10 px-6 lg:px-20 flex flex-col lg:flex-row justify-between items-center lg:items-start">
  {/* Left Section */}
  <div className="w-1/2 h-1/2 mt-20 flex flex-col justify-center ml-[5%]">
    <h2 className="text-7xl font-extrabold text-[#0A0F2C] mb-6 mt-5 leading-tight">
      About CompareFi
    </h2>
    <p className="text-[#4B5563] mb-6 text-lg leading-relaxed">
      CompareFi is an independent platform built to bring transparency and clarity to finance. We simplify complex financial decisions by helping you compare loans, investments, and other products side by side — so you can understand true costs, uncover hidden charges, and choose what’s genuinely right for you.
      Our mission is to make financial decision-making clear, confident, and fair for everyone

    </p>
    <div>
<a class="button1" href="/about">
  <span>Read More</span>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
    <polygon
      points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"
    ></polygon>
    <polygon
      points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"
    ></polygon>
    <polygon
      points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"
    ></polygon>
  </svg>
</a>
</div>
  </div>

  {/* Right Section (Image / Illustration) */}
  <div className="lg:w-1/2 flex justify-center">
    <div className="w-[80%] ml-[10%]">
      <Image
        src={globe}
        alt="CompareFi Overview"
        className=""
      />
    </div>
  </div>
</section>

</section>
{/* WHY COMPAREFI
          <section className="w-full bg-[#EEF1FA] bg-opacity-0 py-20 px-6 lg:px-20">
            <div className="max-w-7xl mx-auto text-center mb-14">
              <h2 className="text-4xl font-extrabold text-[#0A0F2C] mb-4">Why CompareFi?</h2>
              <p className="text-[#4B5563] text-lg max-w-2xl mx-auto">Discover how CompareFi helps you make confident, data-driven financial decisions.</p>
            </div>
            
          </section> */}


{/* ✅ Responsive Why CompareFi Section */}
<section className="w-full py-10 px-6 sm:px-10 lg:px-20 mb-[5%] overflow-hidden">
  <SpotlightCard
    className="flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-20 rounded-3xl p-8 sm:p-12 md:p-16 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl transition-all duration-700 border-none"
    spotlightColor="rgba(255,255,255,0.4)"
  >
    {/* Left Section (Image) */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <div className="w-[95%] max-w-xl">
        <Image
          src={pc}
          alt="CompareFi Overview"
          className="w-full h-auto mix-blend-multiply scale-105 sm:scale-110"
        />
      </div>
    </div>

    {/* Right Section (Text + Cards) */}
    <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left mt-8 lg:mt-0">
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#0A0F2C] mb-4 leading-tight break-words">
        Why CompareFi?
      </h2>

      <p className="text-[#4B5563] mb-6 sm:text-sm md:text-lg lg:text-2xl leading-relaxed break-words">
        Empowering you to see clearly, decide wisely, and choose confidently.
      </p>

      <a className="button1" href="/about">
        <span>Read More</span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66 43">
          <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5"></polygon>
          <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5"></polygon>
          <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5"></polygon>
        </svg>
      </a>

      {/* ✅ Feature Cards */}
      <div
        className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 w-full max-w-2xl 
                   place-items-center auto-rows-fr"
      >
        {[
          {
            title: "Transparent Comparisons",
            description:
              "We uncover the hidden costs, conditions, and fine print behind every financial product — so you see the true picture before you decide.",
          },
          {
            title: "Independent & Unbiased",
            description:
              "CompareFi is a neutral platform with no affiliations or commissions. Every insight is objective, data-backed, and built to help you, not any brand.",
          },
          {
            title: "Smart, Simple Insights",
            description:
              "Complex numbers made easy. Our AI-powered comparisons and clear visuals help you choose what’s truly right for you — faster and with confidence.",
          },
        ].map((feature, i, arr) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className={`w-full sm:w-[90%] rounded-3xl shadow-[0_12px_25px_-5px_rgba(102,102,102,0.5)] 
                       transition-all duration-500 ease-out p-8 sm:p-10 flex flex-col 
                       items-center text-center bg-gradient-to-tr from-white/10 to-white/5 
                       border border-[#c3c6ce] hover:border-[#99e33d] 
                       hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)] overflow-hidden break-words 
                       ${
                         i === arr.length - 1
                           ? "sm:col-span-2 sm:justify-self-center sm:w-[80%]"
                           : ""
                       }`}
          >
            {/* Header */}
            <div className="flex flex-row items-center justify-center sm:justify-start gap-4 w-full mb-3">
              <div className="flex justify-center items-center w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-[#FF5732] flex-shrink-0">
                <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>

              <h4 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0A0F2C] break-words">
                <BlurText
                  text={feature.title}
                  delay={20}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                />
              </h4>
            </div>

            {/* Description */}
            <p className="text-[#4B5563] mt-2 leading-relaxed text-sm sm:text-base break-words">
              <BlurText
                text={feature.description}
                delay={30}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
              />
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </SpotlightCard>
</section>



<section className="w-full flex justify-center items-center pb-20 mb-30 bg-transparent">
  <div className="m2 w-[80%] flex flex-col p-20 relative">
    {/* Glowing background ring */}
    <div className="absolute z-5 inset-2 blur-[60px] opacity-80 group-hover:opacity-100 transition-all duration-500"
         style={{
           background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 70%)"
         }}>
    </div>

    {/* Text + WhatsApp CTA flowing across the card */}
    <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-6">
      <h2 className="flex-1 text-3xl sm:text-4xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
        Want to compare your financial options? Reach out to CompareFi instantly on WhatsApp!
      </h2>

      <a 
        href="https://wa.me/919999999999"  // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
      >
        <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.04 2.004C6.504 2.004 2 6.508 2 12.046c0 1.96.508 3.872 1.472 5.552L2 22l4.56-1.472A9.944 9.944 0 0 0 12.04 22c5.54 0 10.044-4.504 10.044-9.954 0-5.54-4.504-10.042-10.044-10.042zM12.04 20.1c-1.64 0-3.24-.43-4.64-1.25l-.33-.19-2.7.87.88-2.63-.21-.34A8.01 8.01 0 0 1 4.1 12.04c0-4.374 3.566-7.93 7.94-7.93 4.374 0 7.93 3.556 7.93 7.93s-3.556 7.93-7.93 7.93zm4.47-5.93c-.244-.122-1.44-.714-1.664-.8-.224-.084-.388-.122-.552.122-.164.244-.63.8-.772.964-.14.164-.284.184-.528.062-.244-.122-1.03-.378-1.962-1.2-.726-.646-1.216-1.444-1.36-1.688-.14-.244-.015-.376.106-.498.108-.106.244-.274.366-.412.12-.136.16-.244.24-.406.082-.164.04-.308-.02-.43-.06-.122-.552-1.33-.756-1.816-.2-.48-.4-.414-.552-.422l-.47-.008c-.16 0-.42.062-.64.308s-.84.822-.84 2.004c0 1.182.86 2.322.98 2.486.12.164 1.7 2.594 4.14 3.63.578.25 1.03.4 1.384.514.582.186 1.11.16 1.53.098.466-.07 1.44-.586 1.64-1.152.2-.57.2-1.058.14-1.16-.06-.1-.22-.162-.464-.284z"/>
        </svg>
        Contact on WhatsApp
      </a>
    </div>
  </div>
</section>


        </main>
        {/* FOOTER */}
        <Footer />
      </div>
    </TooltipProvider>
  );
}
