// 하루 전체 시간/칼로리 계산
export function getTotalDuration(exerciseData) {
  if (!exerciseData) return null;

  if (typeof exerciseData.total_duration_min === "number") {
    return exerciseData.total_duration_min;
  }

  let sum = 0;
  ["morning", "lunch", "dinner"].forEach((key) => {
    sum += exerciseData?.[key]?.total_duration_min || 0;
  });
  return sum;
}

export function getTotalCalorie(exerciseData) {
  if (!exerciseData) return null;

  if (typeof exerciseData.total_calorie_kcal === "number") {
    return exerciseData.total_calorie_kcal;
  }

  let sum = 0;
  ["morning", "lunch", "dinner"].forEach((key) => {
    sum += exerciseData?.[key]?.total_calorie_kcal || 0;
  });
  return sum;
}
