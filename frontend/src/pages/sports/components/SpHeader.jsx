// 상단 요약 카드 두개
import React from "react";

const S = {
  outerY: "clamp(30px, 6vmin, 70px)",// 카드 바깥 위·아래 간격
  radius: "clamp(20px, 2.4vmin, 26px)",
  padTopBottom: "clamp(22px, 3.4vmin, 32px)",// 카드 안 패딩 (살짝 오른쪽으로 가도록 left를 더 줌)
  padLeft: "clamp(32px, 5vmin, 60px)",
  padRight: "clamp(20px, 3vmin, 36px)",
  gap: "clamp(10px, 4vmin, 30px)",   // 아이콘 + 텍스트 간 간격
  iconSize: "clamp(28px, 7vmin, 60px)",// 아이콘 크기
};

export default function SpHeader({ icon, label, value, unit }) {
  return (
    <div
      className="
        flex items-center
        border border-[#E5E7EB]
        bg-white shadow-sm
        w-full max-w-[clamp(220px,50vmin,620px)]
        mx-auto
      "
      style={{
        borderRadius: S.radius,          
        paddingTop: S.padTopBottom,
        paddingBottom: S.padTopBottom,
        paddingLeft: S.padLeft,               
        paddingRight: S.padRight,
        marginTop: S.outerY,                  
        marginBottom: S.outerY,               
      }}
    >
      {/* 아이콘: 감싸는 div 없이, svg 그대로 + 크기만 통일 */}
      <img
        src={icon}
        alt=""
        style={{
          width: S.iconSize,
          height: "auto",
          marginRight: S.gap,                
        }}
      />

      {/* 텍스트 영역 */}
      <div className="flex flex-col">
        <span className="text-[clamp(12px,2vmin,30px)] font-semibold text-[#98A2B3]">
          {label}
        </span>
        <div className="flex items-baseline gap-[4px] mt-[clamp(4px,1vmin,8px)]">
          <span className="text-[clamp(20px,4vmin,50px)] text-[#101828]">
            {value ?? "-"}
          </span>
          {unit && (
            <span className="text-[clamp(14px,1.6vmin,16px)] text-[#475467]">
              {unit}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
