'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Playfair_Display, Inter, Satisfy } from 'next/font/google';
import { ArrowUpDown } from 'lucide-react';
import { fetchMTF, DEFAULT_NULL_TEXT } from "@/lib/fetchData";

// Fonts
const playfair = Playfair_Display({ weight: ['400','700'], subsets: ['latin'] });
const inter = Inter({ weight: ['300','400','600'], subsets: ['latin'] });
const satisfy = Satisfy({ weight: ['400'], subsets: ['latin'] });


export default function LASPage() {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
const [activeTableCategory, setActiveTableCategory] = useState("marginDetails");

  //Table Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const mtf = await fetchMTF();
        setData(mtf || []);
      } catch (error) {
        console.error("❌ Supabase fetch error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;

    const clean = (val) => {
      if (typeof val === 'string') {
        return parseFloat(val.replace(/[₹,%]/g, '')) || val;
      }
      return val;
    };

    let valA = clean(a[sortField]);
    let valB = clean(b[sortField]);

    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    }
    return sortOrder === 'asc'
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  const renderHeader = (headers) => (
    <tr className="bg-gray-100/80 text-gray-700">
      {headers.map((h) => (
        <th
          key={h.key}
          className="px-4 py-3 font-semibold select-none"
        >
          <div className="flex items-center gap-1">
            {h.label}
            <button
              onClick={() => handleSort(h.key)}
              className="inline-flex items-center text-gray-500 hover:text-gray-800"
            >
              <ArrowUpDown size={14} />
            </button>
            {sortField === h.key && (
              <span className="text-xs">{sortOrder === 'asc' ? '▲' : '▼'}</span>
            )}
          </div>
        </th>
      ))}
    </tr>
  );

  if (loading)
  return (
    <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
      Loading data...
    </div>
  );


  return (
    <div className="relative bg-gradient-to-b from-[#fdfdfd] via-[#f8f9fa] to-[#f0f2f5] min-h-screen text-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/textures/grain.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
      <div className="absolute -top-40 left-10 w-96 h-96 bg-pink-300/30 rounded-full blur-[160px]"></div>
      <div className="absolute top-1/3 -right-20 w-96 h-96 bg-[#0ABAB5]/25 rounded-full blur-[160px]"></div>
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#C3B1E1]/30 rounded-full blur-[140px]"></div>

      {/* Navbar */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-screen-xl px-4 pt-4">
        <Navbar />
      </div>

      <main className="pt-28 space-y-20">

     {/* HERO SECTION */}
<section className="w-[90%] mx-auto px-2 pt-32 pb-20 flex flex-col items-center text-center">
  <div className="w-full flex flex-col items-center justify-center mb-2">
    <div
     className="relative z-10 w-[90%] rounded-3xl bg-gradient-to-b from-[#630bd5] to-[#630bd5] backdrop-blur-xl shadow-2xl sm:p-10 md:p-14 lg:p-20 flex flex-col items-center justify-center mb-[2%] md:gap-14 hover:drop-shadow-2xl hover:scale-102 transition-all duration-700 ease-in-out border-none will-change-transform"
    >
      <h1 className="text-6xl font-bold mb-4 text-white">Margin Trading Facility</h1>
    </div>
  </div>
</section>

{/* MTF INFORMATION SECTION */}
<section className="max-w-[90%] mx-auto px-6 pb-16">
  <h2 className="text-6xl font-bold text-center mb-14 text-gray-900">
    Understanding MTF (Margin Trading Facility)
  </h2>

  {/* 2x2 grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">What is MTF?</h3>
      <p className="text-gray-800 leading-relaxed">
        MTF allows investors to trade more than their capital by borrowing against their holdings,
        while SEBI regulates risk + margin rules strictly.
      </p>
    </div>

    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">Key Benefits</h3>
      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>Higher leveraged exposure in listed stocks.</li>
        <li>Keep positions running instead of square-off intraday.</li>
        <li>Better capital efficiency for swing / positional trades.</li>
        <li>Monthly subscription based exposure (broker specific).</li>
      </ul>
    </div>

    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">MTF vs MIS / Intraday</h3>
      <ul className="space-y-2 text-gray-800">
        <li><strong>MTF:</strong> Carry forward positions overnight.</li>
        <li><strong>MIS:</strong> Has to be closed same day.</li>
        <li><strong>Leverage:</strong> MTF enables higher exposure.</li>
      </ul>
    </div>

    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">Why choose MTF?</h3>
      <p className="text-gray-800 leading-relaxed">
        If you have conviction in a swing trade thesis and want to hold stocks overnight —
        MTF is the cleanest regulated leverage model in India today.
      </p>
    </div>
  </div>

  {/* Snapshot */}
  <div className="mt-16 text-center">
    <h3 className="text-4xl font-bold mb-8 text-black">Quick Snapshot</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Broker Type</p>
        <p className="text-2xl font-bold text-[#FF5732]">Discount / Full-Service</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Margin %</p>
        <p className="text-2xl font-bold text-[#FF5732]">Varies broker-to-broker</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Loan Style</p>
        <p className="text-2xl font-bold text-[#FF5732]">Exposure based</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Pledge Model</p>
        <p className="text-2xl font-bold text-[#FF5732]">SEBI Compliant</p>
      </div>
    </div>
  </div>
</section>

{/* MTF Detailed Comparison Table */}
<section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
  <h3 className="text-4xl font-bold mb-8 text-black pb-6">
    Detailed MTF Comparison
  </h3>

  <div className="w-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 flex">
    <div className="flex w-full gap-4">
      {/* TABLE */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-base text-gray-900">
          <thead>
            <tr className="text-left font-semibold border-b border-white/30">

              {/* STATIC broker */}
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] border border-gray-300">
                Broker
              </th>

              {/* STATIC cost summary */}
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] border border-gray-300">
                Cost Summary
              </th>

              {/* DYNAMIC columns */}
              {(
                activeTableCategory === "marginDetails"
                  ? ["margin_requirement","approved_stocks"]
                  : activeTableCategory === "majorCost"
                  ? ["subscription_fee","interest_slabs","intraday_fee","carry_fee","pledge_unpledge_fee","auto_square_off","dp_charges"]
                  : activeTableCategory === "defaultCharges"
                  ? ["unpaid_mtf_interest"]
                  : ["platform_rating","feedback_rating"]
              ).map((colKey) => (
                <th
                  key={colKey}
                  className="px-5 py-4 border border-gray-300 bg-white/60"
                >
                  {colKey.replace(/_/g," ").replace(/\b\w/g, c => c.toUpperCase())}
                </th>
              ))}

              {/* STATIC enquire */}
              <th className="px-5 py-4 border border-gray-300 bg-white/60">
                Enquire
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((row,index)=>(
              <tr
                key={row.id}
                className={`transition-all duration-300 ${
                  index % 2 === 0 ? "bg-white/50" : "bg-white/30"
                } hover:bg-[#fff7f0]/80 hover:shadow-[0_4px_12px_rgba(255,115,0,0.15)]`}
              >
                {/* Broker */}
                <td className="px-5 py-4 border border-gray-300 font-semibold bg-gradient-to-br from-[#f9fafb] to-[#f1fff1]">
                  {row.broker_name ?? DEFAULT_NULL_TEXT}
                </td>

                {/* Cost Summary */}
                <td className="px-5 py-4 border border-gray-300 whitespace-pre-line">
                  {row.cost_summary && typeof row.cost_summary === "object"
                    ? Object.entries(row.cost_summary).map(([k,v],i)=>(
                        <div key={i}>{`${k}: ${v ?? "—"}`}</div>
                      ))
                    : row.cost_summary ?? DEFAULT_NULL_TEXT}
                </td>

                {/* Dynamic Values */}
                {(
                  activeTableCategory === "marginDetails"
                    ? ["margin_requirement","approved_stocks"]
                    : activeTableCategory === "majorCost"
                    ? ["subscription_fee","interest_slabs","intraday_fee","carry_fee","pledge_unpledge_fee","auto_square_off","dp_charges"]
                    : activeTableCategory === "defaultCharges"
                    ? ["unpaid_mtf_interest"]
                    : ["platform_rating","feedback_rating"]
                ).map((colKey)=>(
                  <td key={colKey} className="px-5 py-4 border border-gray-300">
                    {(() => {
                      const v = row[colKey];

                      // Handle null/undefined safely
                      if (v == null || v === "") return DEFAULT_NULL_TEXT;

                      // Handle JSON fields
                      if (typeof v === "object") {
                        return Object.entries(v).map(([k,val],j)=>(
                          <div key={j}>{`${k}: ${val ?? "—"}`}</div>
                        ));
                      }

                      // Fallback: show value directly
                      return v;
                    })()}
                  </td>
                ))}

                {/* Enquire */}
                <td className="px-5 py-4 border border-gray-300 text-center">
                  <a
                    href={`https://wa.me/919930584020?text=Hi! I'm interested in learning more about MTF by ${encodeURIComponent(
                      row.broker_name || "this broker"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg text-base font-medium shadow-md hover:bg-green-600 hover:scale-[1.05] active:scale-[0.98] transition-all duration-200"
                  >
                    Enquire
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {/* RIGHT BUTTONS */}
      <div className="flex flex-col justify-between gap-4 h-full w-[160px]">

        <button
          onClick={()=>setActiveTableCategory("marginDetails")}
          className={`flex items-center justify-center bg-teal-600 hover:bg-[#FF5732] text-white rounded-2xl shadow-lg transition-all duration-300 flex-1 font-semibold text-sm ${activeTableCategory==="marginDetails"?"scale-105":""}`}
        >
          Margin Details
        </button>

        <button
          onClick={()=>setActiveTableCategory("majorCost")}
          className={`flex items-center justify-center bg-teal-600 hover:bg-[#FF5732] text-white rounded-2xl shadow-lg transition-all duration-300 flex-1 font-semibold text-sm ${activeTableCategory==="majorCost"?"scale-105":""}`}
        >
          Major Cost
        </button>

        <button
          onClick={()=>setActiveTableCategory("defaultCharges")}
          className={`flex items-center justify-center bg-teal-600 hover:bg-[#FF5732] text-white rounded-2xl shadow-lg transition-all duration-300 flex-1 font-semibold text-sm ${activeTableCategory==="defaultCharges"?"scale-105":""}`}
        >
          Default Charges
        </button>

        <button
          onClick={()=>setActiveTableCategory("feedback")}
          className={`flex items-center justify-center bg-teal-600 hover:bg-[#FF5732] text-white rounded-2xl shadow-lg transition-all duration-300 flex-1 font-semibold text-sm ${activeTableCategory==="feedback"?"scale-105":""}`}
        >
          Platform & User Feedback
        </button>

      </div>
    </div>
  </div>
</section>

      
        <Footer />
      </main>

      {/* Fade-in animation */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp { animation: fadeInUp 1s ease forwards; }
      `}</style>
    </div>
  );
}
