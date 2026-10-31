import React from "react";
import DailyHeader from "../dailyfood/components/DailyHeader.jsx";
import timeIcon from "../../assets/sports/sp1.svg";
import calorieIcon from "../../assets/sports/sp2.svg";
import SpHeader from "./components/SpHeader.jsx";
import SpCard from "./components/SpCard.jsx";
import SpHero from "./components/SpHero.jsx";
import useSports from "./hooks/useSports.js";

const S = {
  gridGap: "clamp(10px,2vmin,15px)",
};

export default function SportsPage() {
  const {
    loading,
    errorMsg,
    reload,
    morning,
    lunch,
    dinner,
    totalDuration,
    totalCalorie,
  } = useSports();

  return (
    <div className="min-h-dvh bg-[#F9FAFB] flex justify-center px-[clamp(16px,4vw,40px)]">
      {/* DailyFoodPage와 동일한 1440px 컨테이너 */}
      <div className="w-full max-w-[1440px] py-[clamp(24px,4vh,40px)] space-y-[clamp(24px,4vh,36px)]">
        {/* 상단 헤더 위치 동일 */}
        <DailyHeader />

        {/* 나머지 콘텐츠 */}
        <main className="space-y-[clamp(24px,4vh,36px)]">
          <SpHero
            loading={loading}
            errorMsg={errorMsg}
            onReload={reload}
          />
          {/* 상단 요약 카드*/}
          <section
            className={`grid grid-cols-1 md:grid-cols-2 gap-[${S.gridGap}]`}
          >
            <SpHeader
              icon={timeIcon}
              label="운동시간"
              value={totalDuration}
              unit="분"
            />
            <SpHeader
              icon={calorieIcon}
              label="칼로리 소모"
              value={totalCalorie}
              unit="kcal"
            />
          </section>

          {/*아침,점심,저녁*/}
          <section
            className={`grid grid-cols-1 md:grid-cols-3 gap-[${S.gridGap}] pb-[clamp(24px,4vh,40px)]`}
          >
            <SpCard slotLabel="아침" data={morning} />
            <SpCard slotLabel="점심" data={lunch} />
            <SpCard slotLabel="저녁" data={dinner} />
          </section>
        </main>
      </div>
    </div>
  );
}
