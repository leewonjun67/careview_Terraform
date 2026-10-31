//데이터를 카드용 배열로
import { useMemo } from "react";

export function useWeeklySummary(summary) {
  return useMemo(() => {
    return [
      {
        key: "weight",
        label: "체중",
        value:
          summary?.latest_weight_kg != null
            ? `${summary.latest_weight_kg.toFixed(1)} kg`
            : "-",
      },
      {
        key: "exercise",
        label: "운동시간",
        value:
          summary?.total_exercise_hours != null
            ? `${summary.total_exercise_hours} 시간`
            : "-",
      },
      {
        key: "sleep",
        label: "수면시간",
        value:
          summary?.total_sleep_hours != null
            ? `${summary.total_sleep_hours} 시간`
            : "-",
      },
    ];
  }, [summary]);
}
