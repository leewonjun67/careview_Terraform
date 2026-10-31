import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../../assets/login/login1.svg";

export default function DailyHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isDaily = pathname.startsWith("/dailyfood");
  const isRefood = pathname.startsWith("/food");

  const activeCls =
    "bg-[#1E2939] text-white shadow-sm";
  const inactiveCls =
    "border border-[#D1D5DB] text-[#4B5563] bg-white/70 hover:bg-white transition-colors";

  return (
    <header className="flex items-center justify-between mb-[clamp(18px,6vmin,60px)]">
      <div className="flex items-center gap-[clamp(8px,1.4vmin,10px)]">
        <img
          src={logo}
          alt="Care View 로고"
          className="w-[clamp(35px,4vmin,80px)] h-auto cursor-pointer"
          draggable="false"
          onClick={() => navigate("/dashboard")}
        />
        <span className="text-[clamp(20px,3vmin,40px)] font-semibold text-[#111827]">
          Care View
        </span>
      </div>

      <div className="flex items-center gap-[clamp(8px,1.3vmin,12px)]">
        <button
          type="button"
          onClick={() => navigate("/dailyfood")}
          className={`px-[clamp(16px,2vmin,20px)] py-[clamp(8px,1.4vmin,10px)] rounded-full text-[clamp(12px,1.4vmin,14px)] font-medium ${isDaily ? activeCls : inactiveCls}`}
        >
          금일 추천 식단
        </button>

        <button
          type="button"
          onClick={() => navigate("/food")}
          className={`px-[clamp(16px,2vmin,20px)] py-[clamp(8px,1.4vmin,10px)] rounded-full text-[clamp(12px,1.4vmin,14px)] font-medium ${isRefood ? activeCls : inactiveCls}`}
        >
          맞춤형 식단
        </button>
      </div>
    </header>
  );
}
