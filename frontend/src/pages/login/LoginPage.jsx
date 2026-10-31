import React from "react";
import LoginLeft from "./components/LoginLeft.jsx";
import LoginRight from "./components/LoginRight.jsx";

export default function LoginPage() {
  return (
    // 큰 화면: 2열 / 작은 화면: 세로 스택
    <div className="w-full min-h-dvh bg-white overflow-x-hidden">
      {/* 자식(패널)들이 내부 스크롤 대신, 페이지가 스크롤되도록 높이 제약 제거 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:min-h-dvh lg:overflow-hidden [&>*]:min-h-0">
        <LoginLeft />
        <LoginRight />
      </div>
    </div>
  );
}
