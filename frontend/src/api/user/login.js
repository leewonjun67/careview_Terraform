import { api, getErrorMessage } from "../client";

//로그인
export async function loginUser({ email, password }) {
  try {
    const res = await api.post("/api/user/login", {
      email,
      password,
    });
    // 응답: { access_token, token_type }
    return res.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "로그인에 실패했어요. 이메일/비밀번호를 다시 확인해 주세요."
      )
    );
  }
}

//내정보 조회
export async function fetchMe(accessToken, tokenType = "bearer") {
  try {
    const res = await api.get("/api/user/me", {
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(
      getErrorMessage(
        error,
        "사용자 정보를 불러오지 못했어요. 다시 로그인 해 주세요."
      )
    );
  }
}
