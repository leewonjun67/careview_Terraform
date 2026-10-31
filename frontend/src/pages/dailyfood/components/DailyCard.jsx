import React from "react";

function MacroPill({ label, value, unit }) {
  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl py-[clamp(8px,1.2vmin,10px)] px-[clamp(10px,1.4vmin,12px)] text-center space-y-[3px]">
      <div className="text-[clamp(11px,1.3vmin,12px)] text-[#6B7280]">
        {label}
      </div>
      <div className="text-[clamp(13px,1.6vmin,14px)] font-medium text-[#111827]">
        {value}
        {unit}
      </div>
    </div>
  );
}

export default function DailyCard({ meal }) {
  if (!meal) return null;

  // 백엔드 nutrition 구조 그대로 사용
  const nutrition = meal.nutrition || {};
  const calories = nutrition.calories ?? 0;
  const carbs = nutrition.carbohydrates ?? 0;
  const protein = nutrition.protein ?? 0;
  const fat = nutrition.fat ?? 0;

  const reason = meal.reason ?? meal.description ?? "";

  return (
    <article className="rounded-2xl border border-[#E5E7EB] bg-white/70 overflow-hidden flex flex-col h-full">
      {/* 이미지 */}
      <div className="relative h-[clamp(180px,22vmin,220px)] bg-slate-200">
        {meal.image_url && (
          <img
            src={meal.image_url}
            alt={`${meal.meal_type} 식단`}
            className="w-full h-full object-cover"
          />
        )}

        {/* 왼쪽 하단: 끼니 로고만 남김 */}
        <div className="absolute left-[clamp(10px,1.6vmin,14px)] bottom-[clamp(10px,1.6vmin,14px)]">
          <div className="px-3 py-1 rounded-full bg-white/90 text-[#111827] text-[clamp(11px,1.3vmin,12px)]">
            {meal.meal_type}
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="p-[clamp(16px,2.4vmin,20px)] flex flex-col gap-[clamp(12px,1.8vmin,16px)] flex-1">
        {/* 식단 이름 */}
        {meal.name && (
          <div className="text-[clamp(16px,2.5vmin,50px)] font-semibold text-[#111827] mb-[10px]">
            {meal.name}
          </div>
        )}

        {/* 칼로리 */}
        <div className="flex items-center justify-between">
          <div className="text-[clamp(13px,2vmin,40px)] font-semibold">
            칼로리
          </div>
          <div className="text-[clamp(16px,1.8vmin,40px)] font-semibold text-[#111827]">
            {calories} kcal
          </div>
        </div>

        {/* 영양성분 */}
        <div className="space-y-[6px]">
          <div className="text-[clamp(13px,1.5vmin,40px)] font-semibold text-[#6B7280]">
            영양성분
          </div>
          <div className="grid grid-cols-3 font-semibold gap-[clamp(6px,1vmin,10px)]">
            <MacroPill label="탄수화물" value={carbs} unit="g" />
            <MacroPill label="단백질" value={protein} unit="g" />
            <MacroPill label="지방" value={fat} unit="g" />
          </div>
        </div>

        {/* 식단 구성 */}
        <div>
          <div className="text-[clamp(13px,1.5vmin,14px)] font-semibold text-[#6B7280] mb-[4px]">
            식단 구성
          </div>
          <ul className="list-disc pl-5 space-y-[2px] text-[clamp(12px,1.4vmin,14px)] text-[#374151]">
            {Array.isArray(meal.composition) &&
              meal.composition.map((comp, idx) => (
                <li key={idx}>
                  {comp?.item?.name ?? ""}
                  {comp?.amount != null && comp?.unit
                    ? ` - ${comp.amount}${comp.unit}`
                    : ""}
                </li>
              ))}
          </ul>
        </div>

        {/* 추천 이유 */}
        <div className="mt-auto">
          <div className="text-[clamp(13px,1.5vmin,14px)] font-semibold text-[#6B7280] mb-[4px]">
            추천 이유
          </div>
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl px-[clamp(10px,1.4vmin,12px)] py-[clamp(8px,1.2vmin,10px)] text-[clamp(12px,1.4vmin,14px)] leading-relaxed text-[#4B5563]">
            {reason || "이 식단은 당신의 목표에 맞춰 추천되었어요."}
          </div>
        </div>
      </div>
    </article>
  );
}
