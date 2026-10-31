//메인 대시보드 카드하나
import React from "react";
import useBodySummary from "../../hooks/useBodySummary"; 

export default function BodySummaryCard({ className = "" }) {
  const { age, height, weight, bmiText, hasAnyData } = useBodySummary();

  return (
    <article
      className={`
        flex flex-col
        bg-white
        rounded-[clamp(10px,1.4vmin,14px)]
        shadow-xl
        ring-3 ring-black/7
        p-[clamp(14px,3vmin,30px)]
        min-h-[clamp(170px,42vmin,550px)]
        w-[clamp(200px,16vw,320px)]
        my-[clamp(20px,10vmin,80px)]
        ${className}
      `}
    >
      <h3 className="text-[clamp(16px,2.2vmin,22px)] font-semibold text-[#111827]">
        내 신체 데이터
      </h3>
      <p className="mt-[clamp(2px,0.6vmin,6px)] text-[clamp(11px,1.5vmin,13px)] text-[#6B7280]">
        건강한 삶을 위한 여정
      </p>

      <div className="mt-[clamp(12px,2vmin,18px)]">
        <Row
          label="나이"
          value={age != null ? `${age}세` : "—"}
        />
        <Row
          label="키"
          value={height ? `${height}cm` : "—"}
        />
        <Row
          label="몸무게"
          value={weight ? `${weight}kg` : "—"}
        />
        <Row
          label="BMI"
          value={bmiText}
          highlightBMI
          isLast
        />
      </div>

      {!hasAnyData && (
        <p className="mt-[10px] text-[clamp(11px,1.3vmin,13px)] text-[#6B7280]">
          온보딩에서 나이/신장/체중을 입력하면 자동 계산됩니다.
        </p>
      )}
    </article>
  );
}

function Row({ label, value, highlightBMI = false, isLast = false }) {
  return (
    <div
      className={`
        flex items-center justify-between
        py-[clamp(8px,1.5vmin,12px)]
        ${!isLast ? "border-b border-[#E5E7EB]" : ""}
      `}
    >
      <span className="text-[clamp(12px,1.6vmin,14px)] text-[#4A5565]">
        {label}
      </span>
      <span
        className={`
          text-[clamp(13px,1.8vmin,16px)]
          font-semibold
          ${highlightBMI ? "text-[#667EEA]" : ""}
        `}
      >
        {value}
      </span>
    </div>
  );
}
