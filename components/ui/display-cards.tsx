"use client";

import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import React, { useState } from "react";

/* -----------------------------------------------
   🔹 DisplayCard — Title + Icon on top, 2×2 matrix below
------------------------------------------------ */
interface DataPoint {
  label: string;
  value: string;
}

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  data?: DataPoint[]; // 👈 Array of 4 data points
  iconClassName?: string;
  titleClassName?: string;
  isHovered?: boolean;
  isDimmed?: boolean;
  lift?: number;
}

function DisplayCard({
  className,
  icon = <Sparkles className="w-6 h-6 text-white" />,
  title = "Financial Overview",
  data = [
    { label: "Interest Range", value: "8–20% p.a." },
    { label: "Tenure", value: "Up to 36 months" },
    { label: "Disbursal Time", value: "1–2 Days" },
    { label: "Collateral Type", value: "Listed Shares" },
  ],
  iconClassName,
  titleClassName,
  isHovered = false,
  isDimmed = false,
  lift = 0,
}: DisplayCardProps) {
  const baseCardStyles = cn(
    "absolute flex flex-col justify-between h-[20rem] w-[24rem] -skew-y-[9deg]",
    "select-none rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-md overflow-hidden",
    "transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
  );

  const hoverStyles = isHovered ? `-translate-y-[${lift}px] scale-[1.05] shadow-2xl` : "";
  const dimmedStyles = isDimmed ? "opacity-0 scale-[0.97]" : "";
  const combinedClass = cn(baseCardStyles, hoverStyles, dimmedStyles, className);

  const inlineTransform = {
    transform: isHovered ? `translateY(-${lift}px) scale(1.05)` : undefined,
  };

  return (
    <div className={combinedClass} style={inlineTransform}>
      {/* 🔵 Header (Icon + Title) */}
      <div className="flex items-center gap-4 mb-5">
        <span
          className={cn(
            "inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#FF5732] to-[#ff785a] p-2 shadow-md",
            iconClassName
          )}
        >
          {icon}
        </span>
        <p className={cn("text-xl font-semibold text-[#0A0F2C]", titleClassName)}>
          {title}
        </p>
      </div>

      {/* 🧩 2×2 Data Grid */}
      <div className="grid grid-cols-2 gap-4 w-full">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center rounded-2xl bg-[#f9fafb] py-4 shadow-sm border border-gray-100"
          >
            <span className="text-gray-500 text-sm">{item.label}</span>
            <span className="text-[#FF5732] font-semibold text-lg mt-1">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------------------------
   🔹 DisplayCards — Stacked Container (unchanged)
------------------------------------------------ */
interface DisplayCardsProps {
  cards?: Omit<DisplayCardProps, "isHovered" | "isDimmed" >[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultCards = [
    {
      className: "z-[3] translate-x-[0px] translate-y-[0px] rotate-[-2deg]",
      title: "Loan Against Shares",
      data: [
        { label: "Interest Range", value: "8–20% p.a." },
        { label: "Tenure", value: "Up to 36 months" },
        { label: "Disbursal Time", value: "1–2 Days" },
        { label: "Collateral Type", value: "Listed Shares" },
      ],
      lift: 40,
    },
    {
      className: "z-[2] translate-x-[60px] translate-y-[30px] rotate-[1deg]",
      title: "Loan Against Mutual Funds",
      data: [
        { label: "Interest Range", value: "9–18% p.a." },
        { label: "Tenure", value: "Up to 24 months" },
        { label: "Disbursal Time", value: "1–3 Days" },
        { label: "Collateral Type", value: "Mutual Fund Units" },
      ],
      lift: 60,
    },
    {
      className: "z-[1] translate-x-[120px] translate-y-[60px] rotate-[-4deg]",
      title: "Loan Against Bonds",
      data: [
        { label: "Interest Range", value: "10–15% p.a." },
        { label: "Tenure", value: "Up to 48 months" },
        { label: "Disbursal Time", value: "2–4 Days" },
        { label: "Collateral Type", value: "Corporate Bonds" },
      ],
      lift: 80,
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="relative w-[32rem] h-[22rem] mx-auto mt-10">
      {displayCards.map((cardProps, index) => {
        const isHovered = hoveredIndex === index;
        const isDimmed = hoveredIndex !== null && hoveredIndex !== index;

        return (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <DisplayCard
              {...cardProps}
              isHovered={isHovered}
              isDimmed={isDimmed}
              
            />
          </div>
        );
      })}
    </div>
  );
}
