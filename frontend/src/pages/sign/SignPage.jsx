import React from "react";
import SignLeft from "./components/SignLeft.jsx";
import LoginRight from "../login/components/LoginRight.jsx";

export default function SignPage() {
  return (
    // 큰 화면은 2열로 작은 화면은 세로
    <div className="w-full min-h-dvh bg-white overflow-x-hidden">
      {/* 자식(패널)들이 내부 스크롤 가능하도록 min-h-0 보장 */}
      <div className="min-h-dvh grid grid-cols-1 lg:grid-cols-2 [&>*]:min-h-0">
        <SignLeft />
        <LoginRight />
      </div>
    </div>
  );
}
