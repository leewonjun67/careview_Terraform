//레코드 날짜 헤더

import React from "react";
import { S } from "./style/recordDayStyles";

export default function RecordDayHeader({ weekdayLabel, day }) {
  return (
    <div className="flex flex-col items-center justify-center gap-[4px]">
      <div
        className="text-[#6B7280] font-medium"
        style={{ fontSize: S.dayFs }}
      >
        {weekdayLabel}
      </div>
      <div
        className="text-[#111827]"
        style={{ fontSize: S.dateFs }}
      >
        {day}
      </div>
    </div>
  );
}
