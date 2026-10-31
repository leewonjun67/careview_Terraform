//record 날짜, 데이터 존재여부

//닐찌
export function getDayOfMonth(dateStr) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  return d.getDate();
}

// 기록 데이터 존재 여부 체크 유틸
export function hasMetricData(metric) {
  if (!metric) return false;

  const { weight_kg, sleep_duration_hours, exercise_duration_hours } = metric;
  return (
    weight_kg != null ||
    sleep_duration_hours != null ||
    exercise_duration_hours != null
  );
}
