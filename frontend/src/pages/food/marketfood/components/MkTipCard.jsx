import React from "react";
import iconRe3 from "../../../../assets/refood/re3.svg";

const S = {
  cardPad: "clamp(20px, 2.8vmin, 30px)",
  titleFS: "clamp(16px, 2.1vmin, 30px)",
  bodyFS: "clamp(12px, 1.6vmin, 15px)",
  iconW: "clamp(40px, 6vmin, 70px)",
};

export default function MkTipCard() {
  return (
    <section
      className="bg-white/70 border-2 border-[#D1D5DC] rounded-2xl"
      style={{ padding: S.cardPad }}
    >
      <div className="flex items-start gap-[clamp(8px,1.6vmin,14px)]">
        <img
          src={iconRe3}
          alt=""
          className="h-auto select-none flex-none"
          style={{ width: S.iconW }}
          draggable="false"
        />
        <div className="flex flex-col">
          <div
            className="text-[#101828] font-semibold leading-tight"
            style={{ fontSize: S.titleFS }}
          >
            편의점 건강 조합
          </div>
          <p
            className="text-[#4A5565] mt-[clamp(6px,1.3vmin,10px)] leading-relaxed"
            style={{ fontSize: S.bodyFS }}
          >
            바쁜 일상 속에서도 건강하게! 추천하는 편의점 식품 조합입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
