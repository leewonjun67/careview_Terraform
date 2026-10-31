import React from "react";

const S = {
  imgH: "clamp(110px, 22vmin, 220px)", // 이미지 높이
  bodyPad: "clamp(14px, 2.6vmin, 22px)", // 아래 본문 영역
  bodyMinH: "clamp(210px, 28vmin, 280px)",
  titleFS: "clamp(15px, 2.2vmin, 30px)", // 이미지 안 제목
  kcalFS: "clamp(13px, 1.8vmin, 16px)",
  itemFS: "clamp(13px, 1.8vmin, 20px)",
  macroLabelFS: "clamp(12px, 1.7vmin, 20px)", // 한글
  macroValueFS: "clamp(13px, 1.9vmin, 16px)", // g
  macroPadY: "clamp(8px, 1.8vmin, 12px)",
};

function MacroPill({ label, value }) {
  return (
    <div
      className="flex flex-col items-center justify-center bg-white rounded-xl border border-[#E5E7EB]"
      style={{ paddingBlock: S.macroPadY }}
    >
      <div className="text-[#4A5565]" style={{ fontSize: S.macroLabelFS }}>
        {label}
      </div>
      <div
        className="text-[#101828] font-semibold"
        style={{ fontSize: S.macroValueFS }}
      >
        {value}g
      </div>
    </div>
  );
}

export default function MkCard({ set }) {
  const {
    name,
    image_url,
    total_calorie,
    total_carbs,
    total_protein,
    total_fat,
    composition = [],
  } = set || {};

  return (
    <article className="bg-white/70 border-2 border-[#E5E7EB] rounded-2xl overflow-hidden shadow-sm">
      {/* 이미지 영역 */}
      <div
        className="relative w-full bg-[#EEF2F6] overflow-hidden"
        style={{ height: S.imgH }}
      >
        {image_url ? (
          <img
            src={image_url}
            alt={name}
            className="w-full h-full object-cover"
            draggable="false"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#9AA4B2] text-[clamp(12px,1.6vmin,14px)]">
            이미지 준비중
          </div>
        )}
        <div
          className="absolute left-[clamp(10px,2vmin,14px)] bottom-[clamp(8px,1.6vmin,12px)] text-white font-semibold"
          style={{ fontSize: S.titleFS }}
        >
          {name}
        </div>
      </div>

      {/* 아래 본문 */}
      <div
        className="space-y-[clamp(11px,2vmin,20px)]"
        style={{ padding: S.bodyPad, minHeight: S.bodyMinH }}
      >
        {/* kcal */}
        <div
          className="text-[#101828] font-semibold flex items-center gap-[6px]"
          style={{ fontSize: S.kcalFS }}
        >
          🔥 {total_calorie} kcal
        </div>

        {/* 포함 상품 */}
        <div className="space-y-[clamp(6px,1.2vmin,8px)]">
          <div
            className="text-[#101828] font-semibold"
            style={{ fontSize: S.itemFS }}
          >
            포함 상품
          </div>

          <ul
            className="list-disc pl-[clamp(16px,2.2vmin,20px)] text-[#4A5565] leading-relaxed"
            style={{ fontSize: S.itemFS }}
          >
            {composition.map((c, i) => (
              <li key={c.item?.item_id ?? i}>
                {/* "상품이름 amount+unit" 형태로 표기 */}
                {c.item?.name || "상품"} {c.amount}
                {c.unit || ""}
              </li>
            ))}
          </ul>
        </div>

        {/* 탄/단/지 */}
        <div className="pt-[clamp(6px,1.2vmin,8px)]">
          <div className="grid grid-cols-3 gap-[clamp(8px,1.6vmin,12px)]">
            <MacroPill label="탄수화물" value={total_carbs} />
            <MacroPill label="단백질" value={total_protein} />
            <MacroPill label="지방" value={total_fat} />
          </div>
        </div>
      </div>
    </article>
  );
}
