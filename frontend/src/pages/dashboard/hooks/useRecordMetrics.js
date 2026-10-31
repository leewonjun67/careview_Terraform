//대시보드용 기록 훅
import { useEffect, useMemo, useState } from "react";
import { getRecordPage } from "../../../api/recode/recode.js";


export default function useRecordMetrics() {
  const [weeklyRecords, setWeeklyRecords] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      try {
        const data = await getRecordPage();
        if (cancelled) return;
        setWeeklyRecords(data?.weekly_records || null);
      } catch (err) {
        if (cancelled) return;
        console.error("대시보드용 기록 데이터 불러오기 실패", err);
        setWeeklyRecords(null);
      }
    }

    fetchData();

    return () => {
      cancelled = true;
    };
  }, []);

  const days = weeklyRecords?.daily_records || [];

  const result = useMemo(() => {
    if (!days.length) {
      return {
        latestWeight: null,
        latestSleep: null,
        latestExercise: null,
        weightSeries: [],
        sleepSeries: [],
        exerciseSeries: [],
      };
    }

    // 날짜 오름차순 정렬
    const sorted = [...days].sort((a, b) =>
      String(a?.date || "").localeCompare(String(b?.date || ""))
    );

    // 각 metric에 대해 "week 내 유효한 값들만" series로 만들기
    const buildSeries = (selector) =>
      sorted
        .map((d) => {
          const metric = d?.metric;
          if (!metric) return null;
          const v = selector(metric);
          return typeof v === "number" && !Number.isNaN(v) ? v : null;
        })
        .filter((v) => v != null);

    const weightSeries = buildSeries((m) => m.weight_kg);
    const sleepSeries = buildSeries((m) => m.sleep_duration_hours);
    const exerciseSeries = buildSeries((m) => m.exercise_duration_hours);

    return {
      // "마지막으로 입력한 값" = 최근 1주 안에서 제일 뒤에 있는 값
      latestWeight: weightSeries.at(-1) ?? null,
      latestSleep: sleepSeries.at(-1) ?? null,
      latestExercise: exerciseSeries.at(-1) ?? null,

      // 그래프는 "이번 주" 데이터만 사용
      weightSeries,
      sleepSeries,
      exerciseSeries,
    };
  }, [days]);

  return result;
}
