//입력용 컴포넌트
import React from "react";

export default function RecordInput({
  label,
  value,
  onChange,
  unit,
  pillPy,
  pillPx,
  labelFs,
  valueFs,
  min = 0,
  step = 0.5,
  placeholder = "",
}) {
  const handleChange = (e) => {
    // 항상 문자열로 관리 (상위에서 Number()로 변환)
    onChange?.(e.target.value);
  };

  return (
    <div
      className="bg-white border border-[#E5E7EB] rounded-xl
                 flex flex-col gap-[clamp(4px,0.6vmin,8px)]"
      style={{
        paddingBlock: pillPy,
        paddingInline: pillPx,
      }}
    >
      {/* 라벨 (윗줄) */}
      <span
        className="text-[#6B7280] font-semibold"
        style={{ fontSize: labelFs }}
      >
        {label}
      </span>

      {/* 입력 필드 (아랫줄) */}
      <div className="flex items-center gap-[clamp(4px,1vmin,10px)]">
        <input
          type="number"
          min={min}
          step={step}
          value={value ?? ""} // null/undefined면 빈 문자열
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[#111827] placeholder:text-[#D1D5DC]"
          style={{ fontSize: valueFs }}
        />
        <span
          className="text-[#6B7280] whitespace-nowrap"
          style={{ fontSize: valueFs }}
        >
          {unit}
        </span>
      </div>
    </div>
  );
}
