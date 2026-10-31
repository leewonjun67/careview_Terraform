//나이,키.몸무게,BMI 텍스트를 한 번에 계산해서 카드에게 넘겨 줌.

import { useEffect, useMemo, useState } from "react";
import { getOnboardingStatus } from "../../../api/onboarding";
import {
  computeAgeFromDob,
  formatBMIWithLabel,
} from "../utils/bodyMetrics";

export default function useBodySummary() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [dob, setDob]       = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function loadOnboarding() {
      try {
        const data = await getOnboardingStatus();
        if (cancelled || !data) return;

        setHeight(data.height_cm ?? null);
        setWeight(data.current_weight_kg ?? null);
        setDob(data.date_of_birth ?? null);
      } catch (e) {
        console.error("온보딩 상태 불러오기 실패", e);
      }
    }

    loadOnboarding();
    return () => {
      cancelled = true;
    };
  }, []);

  const age = useMemo(() => computeAgeFromDob(dob), [dob]);

  const { bmi, text: bmiText } = useMemo(
    () => formatBMIWithLabel(height, weight),
    [height, weight],
  );

  const hasAnyData = age != null || !!height || !!weight;

  return {
    age,
    height,
    weight,
    bmi,
    bmiText,
    hasAnyData,
  };
}
