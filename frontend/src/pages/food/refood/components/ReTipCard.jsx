import React from "react";
import iconRe1 from "../../../../assets/refood/re1.svg";

const S = {
  cardPad: "clamp(20px, 2.8vmin, 30px)",
  titleFS: "clamp(16px, 2.1vmin, 30px)",
  bodyFS: "clamp(12px, 1.6vmin, 15px)",
  iconW: "clamp(40px, 6vmin, 70px)",
};

export default function ReTipCard() {
  return (
    <section
      className="bg-white/70 border-2 border-[#D1D5DC] rounded-2xl"
      style={{ padding: S.cardPad }}
    >
      {/* 아이콘, 텍스트 */}
      <div className="flex items-start gap-[clamp(8px,1.6vmin,14px)]">
        <img
          src={iconRe1}
          alt=""
          className="h-auto select-none flex-none"
          style={{ width: S.iconW }}
        />

        {/* 오른쪽 텍스트 블록 */}
        <div className="flex flex-col">
          <div
            className="text-[#101828] font-semibold leading-tight"
            style={{ fontSize: S.titleFS }}
          >
            건강한 요리 팁
          </div>

          <p
            className="text-[#4A5565] mt-[clamp(6px,1.3vmin,10px)] leading-relaxed"
            style={{ fontSize: S.bodyFS }}
          >
            신선한 재료를 사용하고, 조리 시 기름은 최소화해요. 채소는 다양한 색상으로 구성하면
            더 많은 영양소를 섭취할 수 있습니다. 소금 대신 허브나 향신료로 풍미를 더해보세요!
          </p>
        </div>
      </div>
    </section>
  );
}
