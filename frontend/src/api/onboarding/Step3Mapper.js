//age를 백엔드 스펙에 맞게 매핑
import { ALLERGY_NAME_TO_ID } from "./allergyConstants";

export function buildStep3Payload(basic) {
  const age = Number(basic?.age);
  const height = Number(basic?.heightCm);
  const weight = Number(basic?.weightKg);

  //나이는 date_of_birth(대략적인 생년월일)로 변환
  let date_of_birth = basic?.date_of_birth || basic?.dateOfBirth || null;

  if (!date_of_birth && Number.isFinite(age) && age > 0) {
    const now = new Date();
    const year = now.getFullYear() - age;

    // 2000-01-01 형식으로 고정
    const yyyy = String(year).padStart(4, "0");
    date_of_birth = `${yyyy}-01-01`;
  }

  //알레르기 이름 → ID 배열 변환
  const allergy = basic?.allergy || {};
  const hasAllergy = !!allergy.has;
  const names = Array.isArray(allergy.items) ? allergy.items : [];

  const allergy_ids = hasAllergy
    ? names
        .map((name) => ALLERGY_NAME_TO_ID[name])
        .filter((id) => typeof id === "number")
    : [];

  //백엔드 스웨거 스펙에 맞는 payload
  return {
    date_of_birth,          
    height_cm: height,
    current_weight_kg: weight,
    allergy_ids,
  };
}
