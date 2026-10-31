//상단 타이틀
import React from "react";

export default function SignHeader() {
  return (
    <div className="flex flex-col items-center">
      <h1
        className="mt-3 text-center font-semibold text-[#0F172A]"
        style={{ fontSize: "clamp(18px, 3.2vmin, 28px)" }}
      >
        환영합니다!
      </h1>
      <p
        className="text-center text-[#6B7280]"
        style={{
          marginTop: "clamp(6px, 1.4vmin, 10px)",
          fontSize: "clamp(12px, 2.4vmin, 16px)",
        }}
      >
        건강한 삶의 시작, 지금 함께해요
      </p>
    </div>
  );
}
