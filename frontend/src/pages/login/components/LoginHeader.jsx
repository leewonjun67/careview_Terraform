//상단 타이틀
import React from "react";

export default function LoginHeader() {
  return (
    <div className="flex flex-col items-center">
      <h1
        className="mt-2 text-center font-semibold text-[#0F172A]"
        style={{ fontSize: "clamp(16px, 3.2vmin, 28px)" }}
      >
        반가워요!
      </h1>
      <p
        className="text-center text-[#6B7280]"
        style={{
          marginTop: "clamp(6px, 1.4vmin, 10px)",
          fontSize: "clamp(12px, 2.4vmin, 16px)",
        }}
      >
        상쾌한 하루를 시작해볼까요?
      </p>
    </div>
  );
}
