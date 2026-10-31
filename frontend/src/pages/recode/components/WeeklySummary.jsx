// 3개 요약카드
import React from "react";
import summaryIcon from "../../../assets/recode/re1.svg";
import { useWeeklySummary } from "../hooks/useWeeklySummary.js";

const S = {
  wrapGap:   "clamp(10px, 6vmin, 50px)", // 카드 간격
  cardPy:    "clamp(12px, 2.1vmin, 18px)",
  cardPx:    "clamp(14px, 4vmin, 40px)",
  cardMinH:  "clamp(72px, 27vmin, 110px)",
  iconBox:   "clamp(32px, 6vmin, 50px)", // 아이콘 크기
  titleFs:   "clamp(12px, 2vmin, 20px)",   // 라벨
  valueFs:   "clamp(15px, 3vmin, 30px)",   // 값
  headingFs: "clamp(14px, 2.4vmin, 20px)", // '이번 주 요약'
  headingMb: "clamp(10px, 5vmin, 50px)",   // 제목 아래 간격
};

function SummaryCard({ label, value }) {
  return (
    <div
      className="flex items-center rounded-2xl bg-[#009689CC] text-white"
      style={{
        padding: `${S.cardPy} ${S.cardPx}`,
        gap: "clamp(10px,4vmin,30px)",
        minHeight: S.cardMinH,
      }}
    >
      <img
        src={summaryIcon}
        alt=""
        style={{
          width: S.iconBox,
          height: S.iconBox,
        }}
        className="flex-shrink-0"
      />

      <div className="flex flex-col">
        <span
          className="opacity-90 font-semibold"
          style={{ fontSize: S.titleFs }}
        >
          {label}
        </span>
        <span style={{ fontSize: S.valueFs }}>
          {value ?? "-"}
        </span>
      </div>
    </div>
  );
}

export default function WeeklySummary({ summary }) {
  const metrics = useWeeklySummary(summary);

  return (
    <section className="mt-[clamp(40px,20vmin,150px)]">
      <h2
        className="font-semibold text-[#101828]"
        style={{
          fontSize: S.headingFs,
          marginBottom: S.headingMb,
        }}
      >
        이번 주 요약
      </h2>

      <div
        className="grid grid-cols-1 md:grid-cols-3"
        style={{ gap: S.wrapGap }}
      >
        {metrics.map((m) => (
          <SummaryCard
            key={m.key}
            label={m.label}
            value={m.value}
          />
        ))}
      </div>
    </section>
  );
}
