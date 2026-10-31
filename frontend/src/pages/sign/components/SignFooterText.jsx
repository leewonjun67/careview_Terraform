//하단 문구
import React from "react";
import { Link } from "react-router-dom";

export default function SignFooterText() {
  return (
    <div
      className="text-center text-[#6B7280]"
      style={{
        marginTop: "clamp(18px, 3.2vmin, 30px)",
        fontSize: "clamp(12px, 2.3vmin, 14px)",
      }}
    >
      이미 계정이 있으신가요?{" "}
      <Link to="/login" className="text-[#0F172A] hover:underline">
        로그인하기
      </Link>
    </div>
  );
}
