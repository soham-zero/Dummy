'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Link from 'next/link';
import { Briefcase, LineChart, BarChart3, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import SpotlightCard from '@/components/SpotlightCard'; // Correct SpotlightCard import
import BlurText from '@/components/BlurText';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function ProductPage() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [parallaxIcons, setParallaxIcons] = useState([]);

  // Floating parallax icons
  useEffect(() => {
    const iconsData = [Briefcase, LineChart, BarChart3, Sparkles];
    const NUM_ICONS = 12;
    const icons = Array.from({ length: NUM_ICONS }).map((_, i) => {
      const Icon = iconsData[i % iconsData.length];
      return {
        Icon,
        id: `icon-${i}`,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 24 + Math.random() * 30,
        color: ['#B1ED67', '#FF5732', '#1D3537'][i % 3],
        speed: 0.05 + Math.random() * 0.15,
        floatOffset: Math.random() * 20,
        floatSpeed: 1 + Math.random() * 1.5,
      };
    });
    setParallaxIcons(icons);
  }, []);

  const handleMouseMove = (e) => {
    parallaxIcons.forEach((icon) => {
      const el = document.getElementById(icon.id);
      if (el) {
        const moveX = (e.clientX - window.innerWidth / 2) * icon.speed;
        const moveY = (e.clientY - window.innerHeight / 2) * icon.speed;
        el.style.transform = `translate(${moveX}px, ${moveY + Math.sin(Date.now() / 1000 * icon.floatSpeed) * icon.floatOffset}px)`;
      }
    });
  };

  const products = [
    {
      id: 'las',
      name: 'Loan Against Securities (LAS)',
      icon: Briefcase,
      description: 'Leverage your securities portfolio without selling. Instant liquidity while your investments grow.',
      highlights: [
        'Borrow up to 70% of your securities value',
        'Keep your portfolio intact',
        'Flexible repayment options',
      ],
      color: '#FF5732',
    },
    {
      id: 'lamf',
      name: 'Loan Against Mutual Funds (LAMF)',
      icon: LineChart,
      description: 'Quick loans using mutual funds as collateral. Access funds instantly without disturbing long-term goals.',
      highlights: [
        'Minimal documentation & instant approval',
        'Funds linked to your mutual fund portfolio',
        'Stay invested while accessing liquidity',
      ],
      color: '#B1ED67',
    },
    {
      id: 'mtf',
      name: 'Margin Trading Facility (MTF)',
      icon: BarChart3,
      description: 'Amplify your buying power in the market with controlled leverage. Ideal for experienced investors.',
      highlights: [
        'Leverage up to 4x your cash balance',
        'Low interest rates with flexible tenure',
        'Boost portfolio while staying in control',
      ],
      color: '#1D3537',
    },
  ];

  return (
    <div
      className="min-h-screen bg-[#FFFCF6] text-[#000000] overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Parallax Floating Icons */}
      {parallaxIcons.map((icon) => (
        <icon.Icon
          key={icon.id}
          id={icon.id}
          size={icon.size}
          className="absolute opacity-30 pointer-events-none"
          style={{ color: icon.color, left: icon.x, top: icon.y }}
        />
      ))}

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[9999] w-full max-w-screen-xl px-4">
        <Navbar />
      </div>

      <main className="pt-28">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-20">
          <SpotlightCard
            className="w-full max-w-6xl p-10 sm:p-12 md:p-16 rounded-3xl bg-white/20 backdrop-blur-xl shadow-2xl flex flex-col items-center text-center"
            spotlightColor="rgba(177,237,103,0.2)"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#000000]"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <BlurText
                text="CompareFi Products"
                delay={50}
                animateBy="words"
                direction="top"
                className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-[#000000]"
              />
            </motion.h1>
            <motion.p
              className="mt-6 text-lg sm:text-xl md:text-2xl text-[#1D3537] max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Liquidity, leverage, or investment flexibility — discover the solution that fits your financial journey best.
            </motion.p>
          </SpotlightCard>
        </section>

        {/* Product Cards */}
        <section className="max-w-7xl mx-auto px-4 py-20 flex flex-wrap justify-center gap-10">
          {products.map(({ id, name, icon: Icon, description, highlights, color }, i) => (
            <motion.div
              key={id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
            >
              <SpotlightCard
                className={`relative w-80 md:w-96 bg-[#FFFCF6]/90 backdrop-blur-lg rounded-3xl shadow-xl p-6 transition-all duration-500
                  ${hoveredIndex === i ? 'scale-[1.03] shadow-2xl' : 'scale-100'}`}
                spotlightColor={color + '30'}
              >
                <CardHeader className="p-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl`} style={{ backgroundColor: color, color: '#fff' }}>
                      <Icon size={28} />
                    </div>
                    <CardTitle className="text-xl font-bold text-[#000000]">{name}</CardTitle>
                  </div>
                  <CardDescription className="text-slate-700">{description}</CardDescription>
                </CardHeader>
                <CardContent className="px-4 pb-4 space-y-4">
                  <ul className="space-y-1 text-slate-800">
                    {highlights.map((h, idx) => (
                      <li key={idx}>• {h}</li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Link href={`/products/${id}`}>
                      <Button
                        className="w-full sm:w-auto px-5 py-3 bg-[#FF5732] text-white hover:bg-[#B1ED67] transition"
                      >
                        Learn More
                      </Button>
                    </Link>
                    <Link href={`/products/${id}#eligibility`}>
                      <Button
                        variant="ghost"
                        className="w-full sm:w-auto px-5 py-3 text-[#1D3537] border border-[#B1ED67]"
                      >
                        Check Eligibility
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </SpotlightCard>
            </motion.div>
          ))}
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-[#B1ED67] text-[#000000] rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
          >
            <div className="text-center md:text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                Ready to choose the right product?
              </h3>
              <p className="text-base sm:text-lg md:text-xl mt-3 max-w-xl mx-auto md:mx-0">
                Check your eligibility in minutes or book a call with Het for tailored advice.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-0">
              <Link href="/eligibility">
                <Button
                  className="bg-[#FF5732] text-white px-8 py-4 text-base sm:text-lg font-semibold hover:bg-[#B1ED67] transition"
                >
                  Check Eligibility
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  className="border border-[#1D3537] px-8 py-4 text-base sm:text-lg font-semibold hover:bg-[#FFFCF6] transition"
                >
                  Book a call
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
