//운동시간, 값/그래프 연결
import React from "react";
import BodySummaryCard from "./BodySummaryCard.jsx";
import MetricCard from "./MetricCard.jsx";

export default function MetricsRow({
  weightSeries = [],
  exerciseSeries = [],
  sleepSeries = [],
  latestWeight = null,
  latestExercise = null,
  latestSleep = null,
}) {
  return (
    <section className="w-full">
      <div
        className="
          mx-auto
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          gap-x-[clamp(4px,1vmin,18px)]
          gap-y-[clamp(8px,1.6vmin,20px)]
          justify-items-center
        "
      >
        {/* 1. 내 신체 데이터 카드 (온보딩 기반) */}
        <BodySummaryCard />

        {/*몸무게 - 기록실에서 마지막으로 입력한 값*/}
        <MetricCard
          title="몸무게"
          value={latestWeight ?? weightSeries?.at(-1)}
          unit="kg"
          series={weightSeries}
          hint="기록실 기준, 최근 1주 기록"
        />

        {/*운동 시간*/}
        <MetricCard
          title="운동 시간"
          value={latestExercise ?? exerciseSeries?.at(-1)}
          unit="h"
          series={exerciseSeries}
          hint="기록실 기준, 최근 1주 기록"
        />

        {/*수면 시간*/}
        <MetricCard
          title="수면 시간"
          value={latestSleep ?? sleepSeries?.at(-1)}
          unit="h"
          series={sleepSeries}
          hint="기록실 기준, 최근 1주 기록"
        />
      </div>
    </section>
  );
}
