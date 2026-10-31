import { api, getErrorMessage } from "../client";


export async function signUpUser({ name, email, password, agreeTerms, agreePrivacy }) {
  try {
    const body = {
      email,
      password,
      full_name: name,
      // gender 선택 UI가 아직 없으니 임시 고정 값
      gender: "unspecified",
      is_terms_agreed: !!agreeTerms,
      is_privacy_agreed: !!agreePrivacy,
    };

    const res = await api.post("/api/user/register", body);
    // 응답: 생성된 유저 정보
    return res.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "회원가입에 실패했어요. 잠시 후 다시 시도해 주세요."
      )
    );
  }
}
