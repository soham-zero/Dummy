"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import { faqData } from "./faqdata"; 
import SpotlightCard from "@/components/SpotlightCard.jsx";
import { fetchLAS, DEFAULT_NULL_TEXT } from "@/lib/fetchData";


export default function LASPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [sortFieldFunding, setSortFieldFunding] = useState(null);
  const [sortOrderFunding, setSortOrderFunding] = useState("asc");
  const [sortFieldCost, setSortFieldCost] = useState(null);
  const [sortOrderCost, setSortOrderCost] = useState("asc");

  const [currentTable, setCurrentTable] = useState("funding");
  const faqCategories = [
    "All FAQs",
    "Overview",
    "Interest & Charges",
    "Eligibility & Application Process",
    "Securities Accepted",
    "Loan Amount & LTV",
    "Tenure & Repayment",
    "Risks",
    "Other FAQs",
  ];

  const [activeCategory, setActiveCategory] = useState(["All FAQs"]);

  const [openQuestionIndex, setOpenQuestionIndex] = useState(null);

  const displayedFaqs =
    activeCategory === "All FAQs"
      ? Object.values(faqData).flat()
      : faqData[activeCategory] || [];

  // Buttons for table categories
  const categoryButtons = [
    { key: "fundingDetails", label: "Funding Related Details" },
    { key: "majorCost", label: "Major Cost" },
    { key: "defaultCharges", label: "Default Charges" },
    { key: "otherMiscCost", label: "Other Miscellaneous Cost" },
  ];

  // Define columns visible for each category
  const rightTableColumns = {
    fundingDetails: [
      { key: "approved_shares", label: "Approved List of Shares" },
      { key: "tenure_months", label: "Tenure (Months)" },
      { key: "loan_amount", label: "Minimum & Maximum Loan" },
      { key: "regularization_period", label: "Regularization / Margin Call Period (Days)" },
      { key: "ltv", label: "LTV - Funding (Min / Max %)" },
    ],

    majorCost: [
      { key: "interest_rate", label: "Interest Rate (Min / Max / Median %)" },
      { key: "processing_fee", label: "Processing Fee" },
      { key: "prepayment_charges", label: "Pre-payment Charges" },
      { key: "annual_maintenance", label: "Annual Maintenance / Renewal Fees" },
      { key: "penal_charges", label: "Penal Charges (%)" },
    ],

    defaultCharges: [
      { key: "default_charges", label: "Default Charges" },
    ],

    otherMiscCost: [
      { key: "other_expenses", label: "Other Expenses" },
    ],
  };
  const [activeTableCategory, setActiveTableCategory] = useState("fundingDetails");

  //Table Fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const las = await fetchLAS();
        setData(las || []);
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
    if (typeof val === "string")
      return parseFloat(val.replace(/[₹,%]/g, "")) || val;
    return val;
  };

  const handleSort = (field, section) => {
    if (section === "funding") {
      if (sortFieldFunding === field)
        setSortOrderFunding(sortOrderFunding === "asc" ? "desc" : "asc");
      else {
        setSortFieldFunding(field);
        setSortOrderFunding("asc");
      }
    } else {
      if (sortFieldCost === field)
        setSortOrderCost(sortOrderCost === "asc" ? "desc" : "asc");
      else {
        setSortFieldCost(field);
        setSortOrderCost("asc");
      }
    }
  };

  const sortedFundingData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortFieldFunding) return 0;
      let valA = clean(a[sortFieldFunding]);
      let valB = clean(b[sortFieldFunding]);
      if (typeof valA === "number" && typeof valB === "number")
        return sortOrderFunding === "asc" ? valA - valB : valB - valA;
      return sortOrderFunding === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldFunding, sortOrderFunding]);

  const sortedCostData = useMemo(() => {
    return [...data].sort((a, b) => {
      if (!sortFieldCost) return 0;
      let valA = clean(a[sortFieldCost]);
      let valB = clean(b[sortFieldCost]);
      if (typeof valA === "number" && typeof valB === "number")
        return sortOrderCost === "asc" ? valA - valB : valB - valA;
      return sortOrderCost === "asc"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  }, [data, sortFieldCost, sortOrderCost]);

  const switchTable = () =>
    setCurrentTable(currentTable === "funding" ? "cost" : "funding");

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-600">
        Loading data...
      </div>
    );

  return (
    <div className="bg-[#fcfefb] min-h-screen">
      <Navbar />

{/* Hero / Overview */}
<section className="w-[90%] mx-auto px-2 pt-32 pb-20 flex flex-col items-center text-center">
  {/* First Card - stays centered */}
  <div className="w-full flex flex-col items-center justify-center mb-2">
    <SpotlightCard
      className="relative z-10 w-[90%] rounded-3xl bg-gradient-to-b from-[#630bd5] to-[#630bd5]
      backdrop-blur-xl shadow-2xl sm:p-10 md:p-14 lg:p-20 flex flex-col items-center justify-center 
       mb-[2%] md:gap-14 hover:drop-shadow-2xl hover:scale-102 transition-all duration-700 ease-in-out
      border-none will-change-transform"
      spotlightColor="rgba(255,255,255,0.3)"
    >
      <h1 className="text-6xl font-bold mb-4 text-white">Loan Against Shares</h1>
    </SpotlightCard>
  </div>

</section>

{/* LAS Information Section */}
<section className="max-w-[90%] mx-auto px-6 pb-16">
  <h2 className="text-6xl font-bold text-center mb-14 text-gray-900">
    Understanding Loan Against Shares (LAS)
  </h2>

  {/* 2x2 Grid Layout */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Card 1 */}
    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">What is Loan Against Shares?</h3>
      <p className="text-gray-800 leading-relaxed">
        Loan Against Shares (LAS) is a secured overdraft facility where you pledge your
        listed shares as collateral to borrow funds — <strong>without selling them</strong>.
        This allows you to retain ownership, continue earning dividends, and access liquidity 
        when needed.
      </p>
    </div>

    {/* Card 2 */}
    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">Key Benefits</h3>
      <ul className="list-disc list-inside text-gray-800 space-y-2">
        <li>Borrow at lower interest rates (8–20% p.a.) compared to personal loans.</li>
        <li>Quick liquidity without liquidating your portfolio.</li>
        <li>Retain share ownership and earn dividends.</li>
        <li>Flexible usage for business, emergencies, or investments (non-speculative).</li>
      </ul>
    </div>

    {/* Card 3 */}
    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">LAS vs Personal Loan</h3>
      <ul className="space-y-2 text-gray-800">
        <li><strong>Collateral:</strong> LAS requires pledged shares; personal loans are unsecured.</li>
        <li><strong>Interest Rates:</strong> LAS: 8–15%; Personal: 10–24%.</li>
        <li><strong>Tenure:</strong> LAS: Up to 36 months (renewable); Personal: Fixed EMIs.</li>
        <li><strong>Disbursal:</strong> LAS: 1–2 days with digital pledge.</li>
      </ul>
    </div>

    {/* Card 4 */}
    <div className="bg-gray-100 backdrop-blur-xl border border-white/40 rounded-3xl shadow-2xl p-8 hover:shadow-[#A7F3D0] transition-all duration-500 hover:-translate-y-2">
      <h3 className="text-2xl font-bold mb-4 text-[#4805a0]">Why Choose LAS?</h3>
      <p className="text-gray-800 leading-relaxed">
        Maintain your market exposure while unlocking the cash value of your portfolio. 
        LAS is ideal for investors navigating <strong>volatile markets</strong> who want liquidity 
        without losing out on potential growth.
      </p>
    </div>
  </div>

  {/* Snapshot Section */}
  <div className="mt-16 text-center">
    <h3 className="text-4xl font-bold mb-8 text-black">Quick Snapshot</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Interest Range</p>
        <p className="text-2xl font-bold text-[#FF5732]">8–20% p.a.</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Tenure</p>
        <p className="text-2xl font-bold text-[#FF5732]">Up to 36 months</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Disbursal Time</p>
        <p className="text-2xl font-bold text-[#FF5732]">1–2 Days</p>
      </div>
      <div className="bg-white/40 rounded-2xl p-4 shadow-inner">
        <p className="text-gray-600 text-sm">Collateral Type</p>
        <p className="text-2xl font-bold text-[#FF5732]">Listed Shares</p>
      </div>
    </div>
  </div>
</section>


{/* LAS Full Comparison Table Section */}
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
            "1st Year (₹1L LAS)",
            "2nd Year (₹1L LAS)",
            "Approved Shares",
            "Tenure",
            "Min–Max Loan",
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
            } hover:bg-[#cef0a4]/80 hover:shadow-[0_4px_12px_rgba(255,115,0,0.15)]`}
          >
            {/* Institution */}
            <td className="px-5 py-4 border border-gray-300 font-semibold text-gray-900 bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] shadow-[0_2px_4px_rgba(0,0,0,0.06)] relative z-[2]">
              {row.institution_name ?? DEFAULT_NULL_TEXT}
            </td>

            {/* 1st Year Cost */}
            <td className="px-5 py-4 border border-gray-300 text-teal-700 font-medium text-center bg-gradient-to-br from-[#f9fafb] to-[#f1fff1]">
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
            <td className="px-5 py-4 border border-gray-300 text-indigo-700 font-medium text-center bg-gradient-to-br from-[#f9fafb] to-[#f1fff1] relative after:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-[6px] after:shadow-[6px_0_10px_rgba(0,0,0,0.15)] after:z-[3]">
              {row.cost_second_year ? (
                <div className="flex flex-col gap-0.5">
                  <div>Percent: {row.cost_second_year.percent ?? "—"}</div>
                  <div>Amount: ₹{row.cost_second_year.amount ?? "—"}</div>
                </div>
              ) : (
                DEFAULT_NULL_TEXT
              )}
            </td>

            {/* Approved Shares */}
            <td className="px-5 py-4 border border-gray-300 border-l-2 border-gray-400/40 text-gray-800 whitespace-pre-wrap">
              {row.approved_shares
                ? `~ ${row.approved_shares} shares`
                : DEFAULT_NULL_TEXT}
            </td>

            {/* Tenure */}
            <td className="px-5 py-4 border border-gray-300 font-medium text-gray-900 text-center">
              {row.tenure_months
                ? `The approved tenure is ${row.tenure_months} months`
                : DEFAULT_NULL_TEXT}
            </td>

            {/* Loan Amount */}
            <td className="px-5 py-4 border border-gray-300 font-medium text-gray-900 text-center">
              {row.loan_amount ? (
                <div className="flex flex-col">
                  <div>Min: {row.loan_amount.min ?? "—"}</div>
                  <div>Max: {row.loan_amount.max ?? "—"}</div>
                </div>
              ) : (
                DEFAULT_NULL_TEXT
              )}
            </td>

            {/* Interest Rate */}
            <td className="px-5 py-4 border border-gray-300 text-gray-900 text-center">
              {row.interest_rate ? (
                <div className="flex flex-col gap-0.5">
                  <span>
                    <strong>Min:</strong> {row.interest_rate.min ?? "—"}%
                  </span>
                  <span>
                    <strong>Max:</strong> {row.interest_rate.max ?? "—"}%
                  </span>
                  <span>
                    <strong>Median:</strong> {row.interest_rate.median ?? "—"}%
                  </span>
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
                href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about Loan Against Share (LAS) by ${encodeURIComponent(
                  row.institution_name || "this institution"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-md hover:bg-green-600 hover:scale-[1.05] active:scale-[0.98] transition-all duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.04 2.004C6.504 2.004 2 6.508 2 12.046c0 1.96.508 3.872 1.472 5.552L2 22l4.56-1.472A9.944 9.944 0 0 0 12.04 22c5.54 0 10.044-4.504 10.044-9.954 0-5.54-4.504-10.042-10.044-10.042zM12.04 20.1c-1.64 0-3.24-.43-4.64-1.25l-.33-.19-2.7.87.88-2.63-.21-.34A8.01 8.01 0 0 1 4.1 12.04c0-4.374 3.566-7.93 7.94-7.93 4.374 0 7.93 3.556 7.93 7.93s-3.556 7.93-7.93 7.93zm4.47-5.93c-.244-.122-1.44-.714-1.664-.8-.224-.084-.388-.122-.552.122-.164.244-.63.8-.772.964-.14.164-.284.184-.528.062-.244-.122-1.03-.378-1.962-1.2-.726-.646-1.216-1.444-1.36-1.688-.14-.244-.015-.376.106-.498.108-.106.244-.274.366-.412.12-.136.16-.244.24-.406.082-.164.04-.308-.02-.43-.06-.122-.552-1.33-.756-1.816-.2-.48-.4-.414-.552-.422l-.47-.008c-.16 0-.42.062-.64.308s-.84.822-.84 2.004c0 1.182.86 2.322.98 2.486.12.164 1.7 2.594 4.14 3.63.578.25 1.03.4 1.384.514.582.186 1.11.16 1.53.098.466-.07 1.44-.586 1.64-1.152.2-.57.2-1.058.14-1.16-.06-.1-.22-.162-.464-.284z" />
                </svg>
                Enquire
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* Empty State */}
    {(!data || data.length === 0) && (
      <div className="text-gray-600 text-center py-8 font-medium text-[15px]">
        No data available.
      </div>
    )}
  </div>
</section>

{/* Detailed LAS Cost Summary */}
<section className="max-w-[90%] mx-auto px-6 py-10 flex flex-col items-center">
  <h3 className="text-4xl font-bold mb-8 text-black pb-6">
    Detailed LAS Cost Summary
  </h3>

  <div className="w-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-2xl p-6 flex">
    <div className="flex w-full gap-4">
      <div className="flex-1 overflow-x-auto">
        <table className="w-full border-collapse text-base text-gray-900">
          <thead>
            <tr className="text-left font-semibold border-b border-white/30">
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6] border border-gray-300">Institution</th>
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6] border border-gray-300 text-teal-600">1st Year</th>
              <th className="px-5 py-4 bg-gradient-to-br from-[#f9fafb] to-[#edf1f6] border border-gray-300 text-indigo-700 relative after:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-[6px] after:shadow-[6px_0_10px_rgba(0,0,0,0.15)] after:z-[3]">2nd Year</th>
              {rightTableColumns[activeTableCategory].map((col) => (
                <th key={col.key} className="px-5 py-4 border border-gray-300 bg-white/60">{col.label}</th>
              ))}
              <th className="px-5 py-4 border border-gray-300 bg-white/60">Contact</th>
            </tr>
          </thead>

          <tbody>
            {sortedCostData.map((row, index) => (
              <tr key={row.id} className={`transition-all duration-300 ${index % 2 === 0 ? "bg-white/50" : "bg-white/30"} hover:bg-[#cef0a4] `}>
                <td className="px-5 py-4 border border-gray-300 font-semibold text-gray-900 bg-gradient-to-br from-[#f9fafb] to-[#f1fff1]">
                  {row.institution_name ?? DEFAULT_NULL_TEXT}
                </td>

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

                {rightTableColumns[activeTableCategory].map((col) => {
                  const val = row[col.key];
                  return (
                    <td key={col.key} className="px-5 py-4 border border-gray-300 whitespace-pre-wrap text-gray-900">
                      {val == null
                        ? DEFAULT_NULL_TEXT
                        : typeof val === "object"
                        ? Object.entries(val).map(([k, v], idx) => (
                            <div key={idx} className="text-gray-800">
                              {`${k}: ${v ?? "—"}`}
                            </div>
                          ))
                        : val}
                    </td>
                  );
                })}

                <td className="px-5 py-4 border border-gray-300 text-center">
                  <a
                    href={`https://wa.me/919930584020?text=Hi! I’m interested in learning more about Loan Against Share (LAS) by ${encodeURIComponent(
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
        {categoryButtons.map((cat) => (
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


{/* How to Apply & Key Factors Section */}
<section className="max-w-[90%] mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10">
  {/* Card 1 — How to Apply */}
  <div className="bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(255,87,50,0.25)] hover:-translate-y-2">
    <h3 className="text-3xl font-bold mb-6 text-[#4805a0]">
      How to Apply for LAMF in 2025: Step-by-Step Guide
    </h3>
    <ol className="list-decimal list-inside space-y-3 text-gray-800 leading-relaxed text-[1.05rem]">
      <li>
        <strong>Select Eligible Funds:</strong> Verify mutual funds on lender’s
        approved list (via CAMS/KFintech).
      </li>
      <li>
        <strong>Compare Lenders:</strong> Use our tables to shortlist based on
        rates, LTV, and fees.
      </li>
      <li>
        <strong>Apply Online:</strong> Submit application via lender portal or
        fintech platform.
      </li>
      <li>
        <strong>Complete KYC & Lien Marking:</strong> Provide PAN, Aadhaar, MF
        statement, bank proof; pledge via CAMS/KFintech.
      </li>
      <li>
        <strong>Disbursal:</strong> Funds credited in 4–24 hours for digital
        applications.
      </li>
    </ol>
  </div>

  {/* Card 2 — Key Factors */}
  <div className="bg-white/20 backdrop-blur-xl border border-white/40 shadow-2xl rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(13,148,136,0.25)] hover:-translate-y-2">
    <h3 className="text-3xl font-bold mb-6 text-[#4805a0]">
      Key Factors for Choosing the Best LAMF Provider
    </h3>
    <ul className="list-disc list-inside space-y-3 text-gray-800 leading-relaxed text-[1.05rem]">
      <li>
        <strong>LTV Ratio:</strong> Up to 90% for debt funds (e.g., Bajaj); 50–60% for equity.
      </li>
      <li>
        <strong>Approved Funds:</strong> Broader lists (e.g., Tata Capital, HDFC ~1000+ funds)
        offer flexibility.
      </li>
      <li>
        <strong>Margin Call Period:</strong> Longer periods (7 days, Bajaj/Mirae)
        give more time to regularize.
      </li>
      <li>
        <strong>Total Costs:</strong> Low renewal fees (e.g., SBI ₹550) reduce long-term costs.
      </li>
    </ul>
  </div>
</section>


      {/* FAQ Section */}
      <section className="relative max-w-[90%] mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        {/* BUTTON BOX */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 mb-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(13,148,136,0.25)]">
          <div className="flex flex-wrap justify-center gap-6">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  if (cat === "All FAQs") {
                    setActiveCategory(["All FAQs"]);
                  } else {
                    setActiveCategory((prev) => {
                      const isSelected = prev.includes(cat);
                      const newSelection = isSelected
                        ? prev.filter((c) => c !== cat)
                        : [...prev.filter((c) => c !== "All FAQs"), cat];
                      return newSelection.length === 0
                        ? ["All FAQs"]
                        : newSelection;
                    });
                  }
                }}
                className={`min-w-[220px] px-8 py-5 rounded-2xl text-lg font-semibold border-2 transition-all duration-300 backdrop-blur-sm
            ${
              activeCategory.includes(cat)
                ? "bg-teal-600/90 text-white border-teal-600 shadow-lg scale-105"
                : "bg-white/40 text-gray-800 border-white/30 hover:bg-white/60 hover:shadow-lg hover:border-teal-400"
            }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* QUESTIONS BOX */}
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 transition-all duration-500 hover:shadow-[0_0_30px_rgba(13,148,136,0.25)]">
          <div className="space-y-4">
            {(activeCategory.includes("All FAQs")
              ? Object.values(faqData).flat()
              : activeCategory.flatMap((cat) => faqData[cat] || [])
            ).map((item, idx) => (
              <div
                key={idx}
                className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl"
              >
                <button
                  onClick={() =>
                    setOpenQuestionIndex(openQuestionIndex === idx ? null : idx)
                  }
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-700 transform transition-transform duration-300 ${
                      openQuestionIndex === idx ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {openQuestionIndex === idx && (
                  <div className="px-6 pb-4 text-gray-800 text-md bg-white/40 rounded-b-2xl">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquire Now Section */}
      <section className="max-w-[85%] mx-auto px-6 py-12 flex flex-col items-center">
        <h2 className="text-3xl font-bold mb-4">Enquire Now </h2>
        <p className="text-gray-700 mb-6 text-center max-w-2xl">
          Fill in your details and we will get back to you with the best LAS
          options available.
        </p>
        <button className="bg-gradient-to-r from-teal-500 to-[#FF5732] hover:from-teal-600 hover:to-teal-800 text-white px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 font-semibold">
          Contact Us
        </button>
      </section>

      <Footer />
    </div>
  );
}
