// 상단 가운데 날짜 및 설명

import React from "react";
import DailyReButton from "./DailyReButton";

export default function DailyHero({ dateLabel, onRefresh }) {
  return (
    <section className="text-center space-y-[clamp(10px,1.8vmin,14px)]">
      <div className="text-[clamp(13px,1.5vmin,14px)] text-[#6B7280]">
        {dateLabel}
      </div>

      <h1 className="text-[clamp(22px,2.7vmin,28px)] font-semibold text-[#111827]">
        오늘의 맞춤 식단
      </h1>

      <p className="text-[clamp(13px,1.6vmin,15px)] text-[#6B7280]">
        당신의 건강을 위해 분석된 최적의 식단입니다.
      </p>

      {/* 맨 아래 새로고침 버튼 */}
      <div className="pt-[clamp(6px,1vmin,10px)] flex justify-center">
        <DailyReButton onRefresh={onRefresh} />
      </div>
    </section>
  );
}
