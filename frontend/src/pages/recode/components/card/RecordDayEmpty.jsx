//기록이 없는 카드

import React from "react";

export default function RecordDayEmpty() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-5 text-[#9CA3AF]">
      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D1D5DC] leading-none">
        +
      </div>
      <div className="text-[clamp(11px,2vmin,30px)]">
        기록 없음
      </div>
    </div>
  );
}
