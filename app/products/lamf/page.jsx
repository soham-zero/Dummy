"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { faqData } from "./faqdata";
import { fetchLAMF, DEFAULT_NULL_TEXT } from "@/lib/fetchData";

export default function LAMFPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortFieldFunding, setSortFieldFunding] = useState(null);
  const [sortOrderFunding, setSortOrderFunding] = useState("asc");
  const [sortFieldCost, setSortFieldCost] = useState(null);
  const [sortOrderCost, setSortOrderCost] = useState("asc");
  const [currentTable, setCurrentTable] = useState("funding");
  const [faqOpen, setFaqOpen] = useState(null);
  const [activeCategories, setActiveCategories] = useState(["All FAQs"]); // <-- new hook
const [activeTableCategory, setActiveTableCategory] = useState("fundingDetails");

  // --- FAQ data hook ---
  const allCategories = ["All FAQs", ...Object.keys(faqData)];

  
const filteredFaqs = useMemo(() => {
  if (activeCategories.includes("All FAQs")) {
    return Object.values(faqData).flat();
  }
  return activeCategories.flatMap((cat) => faqData[cat] || []);
}, [activeCategories]);
  // --- Helpers ---
  
  const parseLTV = (ltv) => {
    let ltvDebt = "—";
    let ltvEquity = "—";
    if (!ltv) return { ltvDebt, ltvEquity };
    if (typeof ltv === "object") {
      if (ltv.Debt) ltvDebt = ltv.Debt;
      if (ltv.Equity) ltvEquity = ltv.Equity;
    } else if (typeof ltv === "string") {
      const m = ltv.match(/Debt:(.+)\s*Equity:(.+)/i);
      if (m) {
        ltvDebt = m[1].trim();
        ltvEquity = m[2].trim();
      } else {
        ltvDebt = ltv;
        ltvEquity = ltv;
      }
    }
    return { ltvDebt, ltvEquity };
  };

  const parseLoanRange = (str) => {
    if (!str || str === "—") return "—";
    const m = str.match(/Min\s*:\s*(.+?)\s*Max\s*:\s*(.+)/i);
    if (m) return `${m[1].trim()} - ${m[2].trim()}`;
    return str;
  };

  const formatRateForDisplay = (val) => {
    if (val === undefined || val === null) return "—";
    if (typeof val === "string") return val;
    if (typeof val === "number") {
      if (val > 0 && val <= 1) {
        const p = (val * 100).toFixed(2).replace(/\.00$/, "");
        return `${p}%`;
      }
      return `${Number(val).toFixed(2).replace(/\.00$/, "")}%`;
    }
    return String(val);
  };

  // --- Fetch Data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lamf = await fetchLAMF();
        setData(lamf || []);
      } catch (error) {
        console.error("❌ Supabase fetch error:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const clean = (val) => {
    if (!val) return val;
    if (typeof val === "number") return val > 0 && val <= 1 ? val * 100 : val;
    if (typeof val === "string") {
      const cleaned = val.replace(/[₹,%]/g, "").replace(/,/g, "").trim();
      const parsed = parseFloat(cleaned);
      if (!isNaN(parsed)) return parsed;
      return val.toLowerCase();
    }
    return val;
  };

  const handleSort = (field, section) => {
    if (section === "funding") {
      if (sortFieldFunding === field) setSortOrderFunding(sortOrderFunding === "asc" ? "desc" : "asc");
      else {
        setSortFieldFunding(field);
        setSortOrderFunding("asc");
      }
    } else {
      if (sortFieldCost === field) setSortOrderCost(sortOrderCost === "asc" ? "desc" : "asc");
      else {
        setSortFieldCost(field);
        setSortOrderCost("asc");
      }
    }
  };

  const sortedFundingData = useMemo(() => {
    if (!sortFieldFunding) return data;
    return [...data].sort((a, b) => {
      let valA = clean(a[sortFieldFunding]);
      let valB = clean(b[sortFieldFunding]);
      if (typeof valA === "number" && typeof valB === "number") return sortOrderFunding === "asc" ? valA - valB : valB - valA;
      return sortOrderFunding === "asc" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldFunding, sortOrderFunding]);

  const sortedCostData = useMemo(() => {
    if (!sortFieldCost) return data;
    return [...data].sort((a, b) => {
      let valA = clean(a[sortFieldCost]);
      let valB = clean(b[sortFieldCost]);
      if (typeof valA === "number" && typeof valB === "number") return sortOrderCost === "asc" ? valA - valB : valB - valA;
      return sortOrderCost === "asc" ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldCost, sortOrderCost]);

  const switchTable = () => setCurrentTable(currentTable === "funding" ? "cost" : "funding");

  if (loading) return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">Loading LAMF data...</div>;


const handleCategoryClick = (cat) => {
  setActiveCategories((prev) => {
    if (cat === "All FAQs") return ["All FAQs"];

    const isSelected = prev.includes(cat);
    let newSelection = isSelected
      ? prev.filter((c) => c !== cat)
      : [...prev.filter((c) => c !== "All FAQs"), cat];

    return newSelection.length === 0 ? ["All FAQs"] : newSelection;
  });
};



  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <Navbar />
{/* HERO SECTION */}
<section className="w-[90%] mx-auto px-2 pt-32 pb-20 flex flex-col items-center text-center">
  <div className="w-full flex flex-col items-center justify-center mb-2">
    <div
      className="relative z-10 w-[90%] rounded-3xl bg-gradient-to-b from-[#630bd5] to-[#630bd5]
      backdrop-blur-xl shadow-2xl sm:p-10 md:p-14 lg:p-20 flex flex-col items-center justify-center 
       mb-[2%] md:gap-14 hover:drop-shadow-2xl hover:scale-102 transition-all duration-700 ease-in-out
      border-none will-change-transform"
    >
      <h1 className="text-6xl font-bold mb-4 text-white">Loan Against Mutual Funds</h1>
    </div>
  </div>
</section>


{/* LAMF Information Section */}
<section className="max-w-[90%] mx-auto px-6 pb-16">
  <h2 className="text-6xl font-bold text-center mb-14 text-gray-900">
    Understanding LAMF (Loan Against Mutual Funds)
  </h2>

  {/* 2x2 grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">What is LAMF?</h3>
      <p className="text-gray-800 leading-relaxed">
        Loan Against Mutual Funds lets you borrow funds by pledging your Mutual Fund holdings
        without redeeming them — so your investment stays invested & continues compounding.
      </p>
    </div>

    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">Key Benefits</h3>
      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>Liquidity without redeeming MF units.</li>
        <li>Lower interest vs personal loan.</li>
        <li>Continue earning returns on MF portfolio.</li>
        <li>Quick approval via CAMS / KFintech digital lien.</li>
      </ul>
    </div>

    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">LAMF vs Personal Loan</h3>
      <ul className="space-y-2 text-gray-800">
        <li><strong>Collateral:</strong> LAMF requires MF units.</li>
        <li><strong>Interest:</strong> LAMF lower than Personal loan generally.</li>
        <li><strong>Tenure:</strong> 12–36 months avg.</li>
        <li><strong>Disbursal:</strong> Same day possible via digital lien.</li>
      </ul>
    </div>

    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">Why choose LAMF?</h3>
      <p className="text-gray-800 leading-relaxed">
        LAMF is ideal when you want liquidity but don’t want to disturb your compounding — 
        plus MF NAV volatility is lower than direct stock volatility.
      </p>
    </div>
  </div>


  {/* Snapshot */}
  <div className="mt-16 text-center">
    <h3 className="text-4xl font-bold mb-8 text-black">Quick Snapshot</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Interest Range</p>
        <p className="text-2xl font-bold text-[#FF5732]">8–18% p.a.</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Tenure</p>
        <p className="text-2xl font-bold text-[#FF5732]">Up to 36 months</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Collateral Type</p>
        <p className="text-2xl font-bold text-[#FF5732]">Mutual Funds</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Approval</p>
        <p className="text-2xl font-bold text-[#FF5732]">CAMS / KFintech</p>
      </div>
    </div>
  </div>
</section>


{/* LAMF Full Comparison Table Section */}
<section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
  <h3 className="text-4xl font-bold mb-10 text-gray-900 tracking-tight text-center">
    Cost Summary
  </h3>

  <div className="w-full bg-white/40 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-2xl overflow-x-auto">
    <table className="w-full border-collapse text-[15px] text-gray-900">
      <thead className="bg-white/70 backdrop-blur-sm border-b border-gray-300">
        <tr>
          {[
            "Institution",
            "1st Year (₹1L LAMF)",
            "2nd Year (₹1L LAMF)",
            "Approved Funds",
            "Tenure",
            "Min–Max Loan (Debt / Equity)",
            "Interest Rate (Min / Max / Median)",
            "Margin Period",
            "Contact",
          ].map((heading, i) => (
            <th
              key={i}
              className={`px-5 py-3 text-left font-semibold text-sm uppercase tracking-wide text-gray-700 border border-gray-300 relative ${
                i < 3
                  ? "bg-gradient-to-br from-[#f9fafb] to-[#edf1f6]"
                  : "bg-white/60"
              } ${
                i === 2
                  ? "after:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-[6px] after:shadow-[6px_0_10px_rgba(0,0,0,0.15)] after:z-[3]"
                  : ""
              }`}
            >
              {heading}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr
            key={row.id}
            className={`transition-all duration-300 ${
              index % 2 === 0 ? "bg-white/50" : "bg-white/30"
            } hover:bg-[#fff7f0]/80 hover:shadow-[0_4px_12px_rgba(255,115,0,0.15)]`}
          >
            {/* Institution */}
            <td className="px-5 py-4 border border-gray-300 font-semibold text-gray-900 bg-gradient-to-br from-[#f9fafb] to-[#f1fff1]">
              {row.institution_name ?? DEFAULT_NULL_TEXT}
            </td>

            {/* 1st Year Cost */}
            <td className="px-5 py-4 border border-gray-300 text-teal-700 text-center font-medium">
              {row.cost_first_year ? (
                <div className="flex flex-col gap-0.5">
                  <div>Percent: {row.cost_first_year.percent ?? "—"}</div>
                  <div>Amount: ₹{row.cost_first_year.amount ?? "—"}</div>
                </div>
              ) : (
                DEFAULT_NULL_TEXT
              )}
            </td>

            {/* 2nd Year Cost */}
            <td className="px-5 py-4 border border-gray-300 text-indigo-700 text-center font-medium">
              {row.cost_second_year ? (
                <div className="flex flex-col gap-0.5">
                  <div>Percent: {row.cost_second_year.percent ?? "—"}</div>
                  <div>Amount: ₹{row.cost_second_year.amount ?? "—"}</div>
                </div>
              ) : (
                DEFAULT_NULL_TEXT
              )}
            </td>

            {/* Approved Funds */}
            <td className="px-5 py-4 border border-gray-300 text-gray-800 text-center">
              {row.approved_funds
                ? `~ ${row.approved_funds} funds`
                : DEFAULT_NULL_TEXT}
            </td>

            {/* Tenure */}
            <td className="px-5 py-4 border border-gray-300 text-gray-900 text-center font-medium">
              {row.tenure_months
                ? `${row.tenure_months} months`
                : DEFAULT_NULL_TEXT}
            </td>

            {/* Loan Debt + Equity */}
            <td className="px-5 py-4 border border-gray-300 text-center">
              <div className="flex flex-col gap-1">
                <div>
                  <strong>Debt:</strong>{" "}
                  {row.loan_debt
                    ? `${row.loan_debt.min ?? "—"} / ${row.loan_debt.max ?? "—"}`
                    : DEFAULT_NULL_TEXT}
                </div>
                <div>
                  <strong>Equity:</strong>{" "}
                  {row.loan_equity
                    ? `${row.loan_equity.min ?? "—"} / ${row.loan_equity.max ?? "—"}`
                    : DEFAULT_NULL_TEXT}
                </div>
              </div>
            </td>

            {/* Interest Rate */}
            <td className="px-5 py-4 border border-gray-300 text-gray-900 text-center">
              {row.interest_rate ? (
                <div className="flex flex-col gap-0.5">
                  <span><strong>Min:</strong> {row.interest_rate.min ?? "—"}%</span>
                  <span><strong>Max:</strong> {row.interest_rate.max ?? "—"}%</span>
                  <span><strong>Median:</strong> {row.interest_rate.median ?? "—"}%</span>
                </div>
              ) : (
                DEFAULT_NULL_TEXT
              )}
            </td>

            {/* Margin Period */}
            <td className="px-5 py-4 border border-gray-300 text-gray-900 text-center">
              {row.regularization_period
                ? `${row.regularization_period} days`
                : DEFAULT_NULL_TEXT}
            </td>

            {/* Contact */}
            <td className="px-5 py-4 border border-gray-300 text-center">
              <a
                href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about LAMF by ${encodeURIComponent(
                  row.institution_name || "this institution"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-green-600 hover:scale-[1.05] active:scale-[0.98] transition-all duration-200"
              >
                Enquire
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

{/* Detailed LAMF Cost Summary */}
<section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
  <h3 className="text-4xl font-bold mb-8 text-black pb-6">
    Detailed LAMF Cost Summary
  </h3>

  <div className="w-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 flex">
    <div className="flex w-full gap-4">
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-base text-gray-900">
          <thead>
            <tr className="text-left font-semibold border-b border-white/30">
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6] border border-gray-300">
                Institution
              </th>
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6] border border-gray-300 text-teal-600">
                1st Year
              </th>
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6] border border-gray-300 text-indigo-700 relative after:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-[6px] after:shadow-[6px_0_10px_rgba(0,0,0,0.15)] after:z-[3]">
                2nd Year
              </th>

              {/* Dynamic column headers */}
              {activeTableCategory === "fundingDetails" && (
                <>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Approved Funds</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Tenure (Months)</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Equity MF Loan</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Debt MF Loan</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Margin Period</th>
                </>
              )}

              {activeTableCategory === "majorCost" && (
                <>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Interest Rate</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Processing Fee</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Pre-payment Charges</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Annual Maintenance / Renewal Fees</th>
                  <th className="px-5 py-4 border border-gray-300 bg-white/60">Penal Charges</th>
                </>
              )}

              {activeTableCategory === "defaultCharges" && (
                <th className="px-5 py-4 border border-gray-300 bg-white/60">Default Charges</th>
              )}

              {activeTableCategory === "otherMiscCost" && (
                <th className="px-5 py-4 border border-gray-300 bg-white/60">Other Expenses</th>
              )}

              <th className="px-5 py-4 border border-gray-300 bg-white/60">Contact</th>
            </tr>
          </thead>

          <tbody>
            {sortedCostData.map((row, index) => (
              <tr
                key={row.id}
                className={`transition-all duration-300 ${
                  index % 2 === 0 ? "bg-white/50" : "bg-white/30"
                } hover:bg-[#fff7f0]/80 hover:shadow-[0_4px_12px_rgba(255,115,0,0.15)]`}
              >
                {/* Institution */}
                <td className="px-5 py-4 border border-gray-300 font-semibold bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] text-gray-900">
                  {row.institution_name ?? DEFAULT_NULL_TEXT}
                </td>

                {/* 1st Year */}
                <td className="px-5 py-4 border border-gray-300 text-center text-teal-600">
                  {row.cost_first_year ? (
                    <div className="flex flex-col gap-0.5">
                      <div>Percent: {row.cost_first_year.percent ?? "—"}</div>
                      <div>Amount: ₹{row.cost_first_year.amount ?? "—"}</div>
                    </div>
                  ) : (
                    DEFAULT_NULL_TEXT
                  )}
                </td>

                {/* 2nd Year */}
                <td className="px-5 py-4 border border-gray-300 text-center text-indigo-700">
                  {row.cost_second_year ? (
                    <div className="flex flex-col gap-0.5">
                      <div>Percent: {row.cost_second_year.percent ?? "—"}</div>
                      <div>Amount: ₹{row.cost_second_year.amount ?? "—"}</div>
                    </div>
                  ) : (
                    DEFAULT_NULL_TEXT
                  )}
                </td>

                {/* Dynamic rows */}
                {activeTableCategory === "fundingDetails" && (
                  <>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.approved_funds ?? DEFAULT_NULL_TEXT}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.tenure_months ?? DEFAULT_NULL_TEXT}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.loan_equity
                        ? `${row.loan_equity.min ?? "—"} / ${row.loan_equity.max ?? "—"}`
                        : DEFAULT_NULL_TEXT}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.loan_debt
                        ? `${row.loan_debt.min ?? "—"} / ${row.loan_debt.max ?? "—"}`
                        : DEFAULT_NULL_TEXT}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.regularization_period
                        ? `${row.regularization_period} days`
                        : DEFAULT_NULL_TEXT}
                    </td>
                  </>
                )}

                {activeTableCategory === "majorCost" && (
                  <>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.interest_rate ? (
                        <div className="flex flex-col gap-0.5">
                          <span>Min: {row.interest_rate.min ?? "—"}%</span>
                          <span>Max: {row.interest_rate.max ?? "—"}%</span>
                          <span>Median: {row.interest_rate.median ?? "—"}%</span>
                        </div>
                      ) : (
                        DEFAULT_NULL_TEXT
                      )}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.processing_fee ?? DEFAULT_NULL_TEXT}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.prepayment_charges ?? DEFAULT_NULL_TEXT}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.annual_maintenance ?? DEFAULT_NULL_TEXT}
                    </td>
                    <td className="px-5 py-4 border border-gray-300 text-center">
                      {row.penal_charges ?? DEFAULT_NULL_TEXT}
                    </td>
                  </>
                )}

                {activeTableCategory === "defaultCharges" && (
                  <td className="px-5 py-4 border border-gray-300 whitespace-pre-wrap">
                    {row.default_charges
                      ? Object.entries(row.default_charges).map(([k,v],i)=>(
                          <div key={i}>{`${k}: ${v ?? "—"}`}</div>
                        ))
                      : DEFAULT_NULL_TEXT}
                  </td>
                )}

                {activeTableCategory === "otherMiscCost" && (
                  <td className="px-5 py-4 border border-gray-300 whitespace-pre-wrap">
                    {row.other_expenses
                      ? Object.entries(row.other_expenses).map(([k,v],i)=>(
                          <div key={i}>{`${k}: ${v ?? "—"}`}</div>
                        ))
                      : DEFAULT_NULL_TEXT}
                  </td>
                )}

                {/* Contact */}
                <td className="px-5 py-4 border border-gray-300 text-center">
                  <a
                    href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about LAMF by ${encodeURIComponent(
                      row.institution_name || "this institution"
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

      {/* Right Buttons — vertical stack spanning the table height */}
      <div className="flex flex-col justify-between gap-4 h-full w-[130px]">
        {[
          { key: "fundingDetails", label: "Funding Related Details" },
          { key: "majorCost", label: "Major Cost" },
          { key: "defaultCharges", label: "Default Charges" },
          { key: "otherMiscCost", label: "Other Miscellaneous Cost" },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveTableCategory(cat.key)}
            className={`flex flex-row items-center justify-between bg-teal-600 hover:bg-[#FF5732] text-white rounded-2xl shadow-lg transition-all duration-300 flex-1 w-full px-4 font-semibold text-sm ${
              activeTableCategory === cat.key ? "scale-105" : ""
            }`}

          >
            <span className="text-lg font-bold">
              {activeTableCategory === cat.key ? "<-" : "->"}
            </span>
            <span className="tracking-wide">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  </div>
</section>


  {/* --- FAQ Section --- */}
  <section className="max-w-7xl mx-auto px-6 py-12">
  <h2 className="text-4xl font-bold text-center mb-8">Frequently Asked Questions about LAMF</h2>

  {/* Category Buttons */}
  <div className="flex flex-wrap justify-center gap-4 mb-8 p-6 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg">
    {allCategories.map((cat) => (
      <button
        key={cat}
        onClick={() => {
          setActiveCategories((prev) => {
            if (cat === "All FAQs") return ["All FAQs"];
            const isSelected = prev.includes(cat);
            const newSelection = isSelected
              ? prev.filter((c) => c !== cat)
              : [...prev.filter((c) => c !== "All FAQs"), cat];
            return newSelection.length === 0 ? ["All FAQs"] : newSelection;
          });
        }}
        className={`px-8 py-3 rounded-xl shadow-lg font-medium transition-all duration-300 ${
          activeCategories.includes(cat)
            ? "bg-teal-600 text-white shadow-2xl"
            : "bg-white text-gray-700 hover:bg-gray-100"
        }`}
      >
        {cat}
      </button>
    ))}
  </div>

  {/* FAQ Cards */}
  <div className="grid md:grid-cols-2 gap-6">
    {filteredFaqs.map((faq, idx) => (
      <div
        key={idx}
        className="bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg transition-all duration-300"
      >
        <button
          onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
          className="w-full flex justify-between items-center font-semibold text-lg text-left focus:outline-none"
        >
          <span>{faq.question}</span>
          <span
            className={`transform transition-transform duration-300 ${
              faqOpen === idx ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </button>
        {faqOpen === idx && (
          <p className="mt-4 text-gray-700">{faq.answer}</p>
        )}
      </div>
    ))}
  </div>
</section>

  {/* Enquire Now */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Enquire Now</h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Fill in your details and we will get back to you with the best options available.
        </p>
        <button className="bg-gradient-to-r from-teal-500 to-teal-700 hover:from-teal-600 hover:to-teal-800 text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 font-semibold">
          Contact Us
        </button>
      </section>
      <Footer />
    </div>
  );
}