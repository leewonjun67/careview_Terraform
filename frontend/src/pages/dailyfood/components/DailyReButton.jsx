import React from "react";

export default function DailyReButton({
  onRefresh,
  label = "새로운 식단 추천",
}) {
  return (
    <button
      type="button"
      onClick={onRefresh}
      className="
        inline-flex items-center justify-center
        rounded-full
        bg-[#1E2939]
        px-[clamp(14px,2.2vmin,20px)]
        py-[clamp(8px,1.4vmin,10px)]
        text-[clamp(12px,1.4vmin,14px)]
        font-medium
        text-white
        shadow-sm
        hover:bg-[#111827]
        focus:outline-none
        focus-visible:ring-2
        focus-visible:ring-offset-2
        focus-visible:ring-[#1E2939]
        focus-visible:ring-offset-white
        transition
      "
    >
      {label}
    </button>
  );
}
