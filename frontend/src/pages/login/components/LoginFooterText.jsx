//하단 문구
import React from "react";

export default function LoginFooterText() {
  return (
    <div
      className="text-center text-[#6B7280]"
      style={{
        marginTop: "clamp(18px, 3.2vmin, 30px)",
        fontSize: "clamp(12px, 2.3vmin, 14px)",
      }}
    >
      아직 회원이 아니신가요?{" "}
      <a href="/sign" className="text-[#0F172A] hover:underline">
        회원가입하기
      </a>
    </div>
  );
}
