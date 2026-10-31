//스타일 및 공통 설정

export const S = {
  // 카드 전체
  cardW:    "clamp(130px, 15vmin, 170px)",   // 카드 폭
  cardMinH: "clamp(220px, 32vmin, 260px)",   // 최소 높이 (여기 키우면 카드 높이 늘어남)
  cardPy:   "clamp(16px, 2.3vmin, 24px)",    // 카드 위·아래 패딩
  cardPx:   "clamp(14px, 2vmin, 20px)",      // 카드 좌·우 패딩
  cardGap:  "clamp(14px, 2.2vmin, 18px)",    // 헤더 ↔ 내용 간격

  // 내용(필) 공통 패딩
  pillPy: "clamp(10px, 1.8vmin, 14px)",
  pillPx: "clamp(12px, 2vmin, 18px)",
  // 헤더 텍스트
  dayFs:  "clamp(12px, 2.3vmin, 20px)",      // 요일
  dateFs: "clamp(26px, 4vmin, 50px)",        // 날짜 숫자

  inputLabelFs: "clamp(12px, 2vmin, 20px)",   // 라벨용
  inputValueFs: "clamp(14px, 2vmin, 18px)",     // 입력 숫자/단위용
  readLabelFs:  "clamp(12px, 2vmin, 20px)", //읽기 모드
  readValueFs:  "clamp(16px, 2.5vmin, 30px)",
};

// 체중,수면,운동 공통 설정
export const METRIC_CONFIG = [
  {
    key: "weight",
    label: "체중",
    unit: "kg",
    display: (metric) =>
      metric?.weight_kg != null ? `${metric.weight_kg.toFixed(1)} kg` : "-",
  },
  {
    key: "sleep",
    label: "수면시간",
    unit: "시간",
    display: (metric) =>
      metric?.sleep_duration_hours != null
        ? `${metric.sleep_duration_hours} 시간`
        : "-",
  },
  {
    key: "exercise",
    label: "운동시간",
    unit: "시간",
    display: (metric) =>
      metric?.exercise_duration_hours != null
        ? `${metric.exercise_duration_hours} 시간`
        : "-",
  },
];