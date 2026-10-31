import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/dailyfood/df2.svg"; 

const S = {
  h:        "clamp(52px, 9vh, 72px)",
  logoBox:  "clamp(30px, 5vmin, 60px)",
  titleFs:  "clamp(15px, 3vmin, 40px)",
  btnPx:    "clamp(14px, 2.5vmin, 20px)", //로그아웃 너비
  btnPy:    "clamp(6px, 1.2vmin, 10px)",  //그럼이건 높이겠지
  btnGap:   "clamp(4px, 1vmin, 8px)",
  btnFs:    "clamp(13px, 1.7vmin, 16px)",
};

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      //로그인 때 저장했던 토큰/정보 삭제
      window.localStorage.removeItem("cv-auth");

    } catch (e) {
      // 무시
    }

    // 로그인 페이지로 이동 (경로는 프로젝트에 맞게 수정)
    navigate("/login", { replace: true });
  };

  return (
    <header className="w-full bg-white border-b border-[#E5E7EB]">
      <div
        className="flex items-center justify-between px-[clamp(15px,5vw,60px)]"
        style={{ minHeight: S.h }}
      >
        {/* 왼쪽 로고 + 텍스트 */}
        <div className="flex items-center gap-[clamp(8px,1.5vmin,20px)] ml-[4px]">
          <img
            src={logo}
            alt="Care View 로고"
            style={{ width: S.logoBox, height: "auto" }}
            className="block"
          />

          <span
            className="font-semibold text-[#111827]"
            style={{ fontSize: S.titleFs }}
          >
            Care View
          </span>
        </div>

          {/* 오른쪽 로그아웃 버튼 */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center justify-center rounded-full border-2 border-[#CBD5E1] bg-white text-[#111827] hover:bg-[#F9FAFB] transition-colors"
            style={{
              paddingInline: S.btnPx,
              paddingBlock: S.btnPy,
              gap: S.btnGap,
              fontSize: S.btnFs,
            }}
          >
            {/* 아이콘 */}
            <span>로그아웃</span>
          </button>
        </div>
    </header>
  );
}
