// 기록실 전용 API 모듈
import { api, withAuth } from "../client";

// 주간 기록 페이지 데이터 조회
export function getRecordPage(targetDate) {
  const params = {};
  if (targetDate) params.target_date = targetDate;

  // 두 번째 인자에 withAuth 사용
  return api
    .get("/api/record/page", withAuth({ params }))
    .then((res) => res.data);
}

//특정 날짜의 건강 기록 생성/수정
export function saveRecordMetric(payload) {
  return api
    .post("/api/record/metric", payload, withAuth())
    .then((res) => res.data);
}
