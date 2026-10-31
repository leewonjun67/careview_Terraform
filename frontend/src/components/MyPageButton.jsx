import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function MyPageButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const HIDE_PATHS = ["/", "/login", "/sign", "/onboarding"]; //버튼 숨김 페이지

  if (HIDE_PATHS.includes(location.pathname)) {
    return null;
  }

  const handleClick = () => {
    navigate("/onboarding");
    
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        fixed z-50
        bottom-[clamp(16px,3vh,28px)]
        right-[clamp(16px,3vh,28px)]
        px-[clamp(14px,2.4vmin,18px)]
        py-[clamp(10px,1.8vmin,12px)]
        rounded-full shadow-lg border border-[#0B5D51]/15
        bg-[#0B5D51] text-white
        text-[clamp(13px,1.3vmin,15px)] font-semibold
        hover:opacity-95 active:scale-[0.98] transition
      "
    >
      온보딩 수정하기
    </button>
  );
}
