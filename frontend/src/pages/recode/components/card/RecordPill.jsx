//읽기용 컴포넌트
import React from "react";

export default function RecordPill({
  label,
  value,
  pillPy,
  pillPx,
  labelFs,
  valueFs,
}) {
  return (
    <div
      className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl
                 flex flex-col gap-[clamp(4px,0.8vmin,8px)]"
      style={{
        paddingBlock: pillPy,
        paddingInline: pillPx,
      }}
    >
      <span
        className="text-[#6B7280] font-semibold"
        style={{ fontSize: labelFs }}
      >
        {label}
      </span>
      <span
        className="text-[#111827]"
        style={{ fontSize: valueFs }}
      >
        {value}
      </span>
    </div>
  );
}
