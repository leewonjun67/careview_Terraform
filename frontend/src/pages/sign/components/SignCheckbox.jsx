//약관 체크박스
import React from "react";

export default function SignCheckbox({
  badgeLabel, // "필수" | "선택"
  text,
  checked,
  onChange,
  marginTop,
}) {
  return (
    <label
      className="flex items-center text-[#4A5565]"
      style={{
        gap: "clamp(8px, 2.2vmin, 12px)",
        fontSize: "clamp(12px, 2.3vmin, 14px)",
        marginTop,
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange?.(e.target.checked)}
        className="accent-[#111827]"
        style={{
          width: "clamp(14px, 2.2vmin, 16px)",
          height: "clamp(14px, 2.2vmin, 16px)",
        }}
      />
      <span className="inline-flex items-center">
        <span
          className="rounded-[8px] bg-[#F3F4F6] text-[#6B7280] mr-2 px-2 py-[2px]"
          style={{ fontSize: "clamp(10px, 1.9vmin, 12px)" }}
        >
          {badgeLabel}
        </span>
        {text}
      </span>
    </label>
  );
}
