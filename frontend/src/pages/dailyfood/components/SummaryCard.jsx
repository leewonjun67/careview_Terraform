//상단 4개 요약 카드

import React from "react";

export default function SummaryCard({
  label,
  value,
  unit,
  showBar = false,
  ratio = 0,
}) {
  return (
    <div className="bg-white/70 border border-[#E5E7EB] rounded-2xl p-[clamp(16px,2.4vmin,20px)] shadow-sm flex flex-col gap-[clamp(6px,1vmin,8px)]">
      <div className="text-[clamp(12px,1.4vmin,13px)] text-[#6B7280]">
        {label}
      </div>
      <div className="text-[clamp(18px,2.1vmin,20px)] font-semibold text-[#111827]">
        {value}
        {unit && (
          <span className="ml-1 text-[clamp(13px,1.5vmin,14px)]">{unit}</span>
        )}
      </div>
      {showBar && (
        <div className="mt-[4px] h-[6px] rounded-full bg-[#E5E7EB] overflow-hidden">
          <div
            className="h-full rounded-full bg-[#1E2939]"
            style={{ width: `${Math.min(100, Math.round(ratio * 100))}%` }}
          />
        </div>
      )}
    </div>
  );
}
