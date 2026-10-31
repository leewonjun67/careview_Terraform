import React from "react";
import SummaryCard from "./components/SummaryCard.jsx";
import DailyCard from "./components/DailyCard.jsx";
import DailyHeader from "./components/DailyHeader.jsx";
import DailyHero from "./components/DailyHero.jsx";
import Footer from "../../layout/footer/footer.jsx";

import {
  useTodayMeals,
  TARGET_CALORIES,
} from "./hooks/useTodayMeals.js";
import { DailyDate } from "./utils/DailyDate.js";

export default function DailyFoodPage() {
  const { meals, totals, refreshMeal } = useTodayMeals();

  const dateLabel = DailyDate();

  // totals가 로딩 전에는 null일 수 있으므로 안전하게 처리
  const totalCalories = totals?.calories ?? 0;
  const totalCarbs = totals?.carbohydrates ?? 0;
  const totalProtein = totals?.protein ?? 0;
  const totalFat = totals?.fat ?? 0;

  const calorieRatio =
    TARGET_CALORIES > 0 ? totalCalories / TARGET_CALORIES : 0;

  return (
    <div className="min-h-dvh bg-[#F9FAFB] flex justify-center px-[clamp(16px,4vw,40px)]">
      <div className="w-full max-w-[1440px] py-[clamp(24px,4vh,40px)] space-y-[clamp(24px,4vh,36px)]">
        {/* 상단 헤더 */}
        <DailyHeader />

        {/* 상단 히어로 + 새로고침 버튼 */}
        <DailyHero
          dateLabel={dateLabel}
          onRefresh={refreshMeal}
        />

        {/* 상단 4개 요약 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-[clamp(10px,2vmin,18px)]">
          <SummaryCard
            label="총 칼로리"
            value={`${totalCalories} / ${TARGET_CALORIES}`}
            unit="kcal"
            showBar
            ratio={calorieRatio}
          />
          <SummaryCard label="탄수화물" value={totalCarbs} unit="g" />
          <SummaryCard label="단백질" value={totalProtein} unit="g" />
          <SummaryCard label="지방" value={totalFat} unit="g" />
        </section>

        {/* 현재 적용된 아침/점심/저녁 카드 */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[clamp(16px,2.4vmin,22px)] pb-[clamp(24px,4vh,40px)]">
          {meals.map((meal) => (
            <DailyCard
              key={meal.recipe_id}
              meal={meal}
            />
          ))}
        </section>
        <Footer />
      </div>
    </div>
  );
}
