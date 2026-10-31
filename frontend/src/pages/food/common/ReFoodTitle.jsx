//상단 제목. 편의점 조합에서도 재사용 할 예정
import React from "react";

export default function ReFoodTitle({
  title = "맞춤형 식단 추천",
  subtitle = "냉장고 재료로 만들 수 있는 요리와 편의점 건강 조합을 찾아보세요",
}) {
  return (
    <div className="w-full flex flex-col items-center text-center gap-[clamp(6px,1.2vmin,10px)]">
      <h1 className="text-black font-semibold text-[clamp(18px,2.4vmin,28px)] leading-tight">
        {title}
      </h1>
      <p className="text-[#4A5565] text-[clamp(12px,1.6vmin,16px)] leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
