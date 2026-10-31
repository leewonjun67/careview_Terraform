// 탭 컴포넌트
import React from "react";

const S = {
  tabH: "clamp(38px, 5.2vmin, 48px)",
  tabFS: "clamp(12px, 1.5vmin, 15px)",
  radius: "9999px",
};

export default function ReFoodTabs({ value = "fridge", onChange }) {
  const isFridge = value === "fridge";
  const isConven = value === "convenience";

  return (
    <div
      className="w-full bg-white border-2 border-[#D1D5DC] rounded-full p-[clamp(2px,0.6vmin,4px)] flex"
      style={{ height: S.tabH, borderRadius: S.radius }}
    >
      <button
        onClick={() => onChange?.("fridge")}
        className={`flex-1 rounded-full transition-colors duration-200 font-medium
          ${isFridge ? "bg-[#1E2939] text-white" : "bg-white text-[#1E2939]"}`}
        style={{ fontSize: S.tabFS, borderRadius: S.radius }}
      >
        냉장고 재료 활용
      </button>
      <button
        onClick={() => onChange?.("convenience")}
        className={`flex-1 rounded-full transition-colors duration-200 font-medium
          ${isConven ? "bg-[#1E2939] text-white" : "bg-white text-[#1E2939]"}`}
        style={{ fontSize: S.tabFS, borderRadius: S.radius }}
      >
        편의점 조합 추천
      </button>
    </div>
  );
}
