export const onboardingLocal = {
  goal: null,                              
  schedule: { days: [], time: null },      // 2단계
  basic:   { age: null, heightCm: null, weightKg: null, sex: null }, // 3단계
  job:     { type: null, activityLevel: null, shift: null },         // 4단계
  // 5단계는 완료 화면 (검증 없음)
};

export const isStepComplete = (s, step) => {
  switch (step) {
    case 1: return !!s.goal;
    case 2: return !!(s.schedule?.days?.length && s.schedule?.time);
    case 3: return !!(s.basic?.age && s.basic?.heightCm && s.basic?.weightKg && s.basic?.sex);
    case 4: return !!(s.job?.type && s.job?.activityLevel);
    case 5: return true; // 완료
    default: return false;
  }
};
