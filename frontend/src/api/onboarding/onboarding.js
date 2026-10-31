import { api, withAuth } from "../client";
import { buildStep3Payload } from "./Step3Mapper";

// 현재 온보딩 상태 조회
export async function getOnboardingStatus() {
  const res = await api.get("/api/onboarding/status", withAuth());
  return res.data;
}

// Step 1: 체지방, 근육량 목록
export async function fetchGoals() {
  const res = await api.get("/api/onboarding/goals", withAuth());
  return res.data?.goals ?? [];
}

// Step 1: 목표 설정
export async function saveOnboardingStep1(goal) {
  const body = { goal };
  const res = await api.post("/api/onboarding/step1", body, withAuth());
  return res.data;
}

// Step 2: 요일별 운동
export async function saveOnboardingStep2(schedule) {
  const payload = {};

  const mapDay = (key, value) => {
    if (!value?.enabled || !value.start || !value.end) {
      payload[key] = {};
      return;
    }
    payload[key] = {
      start_time: value.start,
      end_time: value.end,
    };
  };

  mapDay("monday",    schedule?.mon);
  mapDay("tuesday",   schedule?.tue);
  mapDay("wednesday", schedule?.wed);
  mapDay("thursday",  schedule?.thu);
  mapDay("friday",    schedule?.fri);
  mapDay("saturday",  schedule?.sat);
  mapDay("sunday",    schedule?.sun);

  const res = await api.post("/api/onboarding/step2", payload, withAuth());
  return res.data;
}

//Step 3 나이, 키, 몸무게, 알레르기-변환 유틸 사용
export async function saveOnboardingStep3(basic) {
  const body = buildStep3Payload(basic);  //여기서만 변환 호출
  const res = await api.post("/api/onboarding/step3", body, withAuth());
  return res.data;
}

//알레르기 전체 목록 조회
export async function fetchAllergies() {
  const res = await api.get("/api/onboarding/allergies", withAuth());
  return res.data?.allergies ?? [];
}

//Step 4 목록 조회
export async function fetchJobs() {
  const res = await api.get("/api/onboarding/jobs", withAuth());
  return res.data?.jobs ?? [];
}

//Step 4: 직업
export async function saveOnboardingStep4(jobType) {
  const body = { job_type: jobType };
  const res = await api.post("/api/onboarding/step4", body, withAuth());
  return res.data;
}

//Step 5: 온보딩 완료
export async function completeOnboarding() {
  const body = { is_onboarding_complete: true };
  const res = await api.post("/api/onboarding/step5", body, withAuth());
  return res.data;
}
