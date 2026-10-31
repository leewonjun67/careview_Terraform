//BMI,BMI 라벨,생년월일-나이 계산 유틸

//BMI 계산 cm,kg
export function computeBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const h = Number(heightCm) / 100;
  if (!h || !Number(weightKg)) return null;
  const bmi = Number(weightKg) / (h * h);
  return Number.isFinite(bmi) ? Number(bmi.toFixed(1)) : null;
}

//bmi기준 분류
export function bmiLabel(bmi) {
  if (bmi == null) return "—";
  if (bmi < 18.5) return "저체중";
  if (bmi < 23)   return "정상";
  if (bmi < 25)   return "과체중";
  return "비만";
}

//BMI 수치, 라벨을 한번에 포맷
export function formatBMIWithLabel(heightCm, weightKg) {
  const bmi = computeBMI(heightCm, weightKg);
  if (bmi == null) {
    return { bmi: null, text: "—" };
  }
  const label = bmiLabel(bmi);
  return {
    bmi,
    text: label ? `${bmi}(${label})` : String(bmi),
  };
}

//date_of_birth를 나이로
export function computeAgeFromDob(dateOfBirth) {
  if (!dateOfBirth) return null;
  const [y, m, d] = dateOfBirth.split("-").map(Number);
  if (!y || !m || !d) return null;

  const today = new Date();
  let age = today.getFullYear() - y;
  const monthDiff = (today.getMonth() + 1) - m;
  const dayDiff = today.getDate() - d;

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }
  return age;
}
