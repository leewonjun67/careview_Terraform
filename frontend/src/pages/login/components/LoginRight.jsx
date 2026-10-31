import React from "react";
import bg from "../../../assets/login/login2.svg";
import logo from "../../../assets/login/login3.svg";
import text from "../../../assets/login/login4.svg";

// 반응형 조절 노브
const LIFT   = "clamp(0px, 9vh, 140px)";       // 작은 화면에서 과한 상승 방지
const LOGO_H = "clamp(66px, 15vmin, 250px)";   // 로고 높이
const TEXT_W = "clamp(300px, 50vw, 380px)";    // 텍스트 폭
const GAP    = "clamp(16px, 16vmin, 160px)";    // 로고↔텍스트 간격
const VPAD   = "clamp(12px, 6vh, 80px)";       // 상·하 여백

export default function LoginRight({
  logoClass = "",
  textClass = "",
  containerClass = "",
}) {
  return (
    <aside
      className="
        w-full border-l border-[#E5E7EB]
        bg-no-repeat bg-center bg-cover
      "
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* 작은 화면: min-h-dvh + 내부 스크롤 / 큰 화면: 1뷰포트 + 살짝 위로 */}
      <div
        className="min-h-dvh lg:h-dvh lg:box-border flex items-center justify-center
                   translate-y-0 lg:-translate-y-[var(--lift)]
                   overflow-y-auto lg:overflow-hidden"
        style={{
          paddingTop: VPAD,
          paddingBottom: VPAD,
          "--lift": LIFT,
        }}
      >
        <div
          className={`inline-flex flex-col items-center w-fit max-w-full ${containerClass}`}
          style={{ gap: GAP, padding: "clamp(12px,2vw,32px)" }}
        >
          {/* 로고 */}
          <img
            src={logo}
            alt="Care View 로고"
            className={`w-auto shrink-0 ${logoClass}`}
            style={{ height: LOGO_H }}
            draggable="false"
          />
          {/* 텍스트 */}
          <img
            src={text}
            alt="Care View 텍스트"
            className={`max-w-none h-auto shrink-0 ${textClass}`}
            style={{ width: TEXT_W }}
            draggable="false"
          />
        </div>
      </div>
    </aside>
  );
}
