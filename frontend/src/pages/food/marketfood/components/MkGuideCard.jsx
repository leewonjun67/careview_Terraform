import React from "react";
import iconRe4 from "../../../../assets/refood/re4.svg";

const S = {
  cardPad: "clamp(20px, 2.8vmin, 30px)",
  titleFS: "clamp(16px, 2.1vmin, 30px)",
  bodyFS: "clamp(12px, 1.6vmin, 15px)",
  iconW: "clamp(40px, 6vmin, 70px)",
};

export default function MkGuideCard() {
  return (
    <section
      className="bg-white/70 border-2 border-[#D1D5DC] rounded-2xl"
      style={{ padding: S.cardPad }}
    >
      <div className="flex items-start gap-[clamp(8px,1.6vmin,14px)]">
        <img
          src={iconRe4}
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
            편의점 식품 선택 가이드
          </div>

          <div
            className="text-[#4A5565] mt-[clamp(6px,1.3vmin,10px)] leading-relaxed space-y-[clamp(6px,1.3vmin,10px)]"
            style={{ fontSize: S.bodyFS }}
          >
            <p>
              편의점 도시락을 선택할 때는 영양 성분표를 확인하세요.
              나트륨이 낮고 단백질이 풍부한 제품을 고르는 것이 좋습니다.
            </p>
            <p className="bg-white/60 font-semibold border-2 border-[#E5E7EB] rounded-xl p-[clamp(8px,1.6vmin,12px)]">
              ✔ 편의점 식품은 간편하지만 나트륨이 높을 수 있으니,
              하루 권장 섭취량을 고려해 선택해주세요.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
