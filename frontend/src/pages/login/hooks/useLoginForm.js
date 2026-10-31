//로그인 훅
import { useState } from "react";
import { loginUser } from "../../../api/user/login";
import { getOnboardingStatus } from "../../../api/onboarding";

export default function useLoginForm({ onGoToMain, onGoToOnboarding } = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false); // UI 유지
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canSubmit = Boolean(email.trim() && password);

  const handleSubmit = async () => {
    if (!canSubmit || loading) return;

    try {
      setLoading(true);
      setError("");

      //로그인 요청
      const data = await loginUser({ email: email.trim(), password });

      //액세스 토큰 로컬스토리지 저장 (cv-auth)
      localStorage.setItem(
        "cv-auth",
        JSON.stringify({
          accessToken: data.access_token,
          tokenType: data.token_type,
          keepLogin,
        })
      );

      //온보딩 상태 조회 후, 경로 분기
      try {
        const status = await getOnboardingStatus();

        const isComplete =
          status?.is_onboarding_complete ??
          status?.isOnboardingComplete ??
          status?.onboarding_complete;

        if (isComplete) {
          //온보딩 완료-메인으로
          onGoToMain?.();
        } else {
          //온보딩 미완료-온보딩 페이지
          onGoToOnboarding?.();
        }
      } catch (e) {
        //온보딩 조회 실패 시 안전하게 온보딩으로
        onGoToOnboarding?.();
      }
    } catch (err) {
      setError(
        err?.message || "로그인에 실패했어요. 다시 시도해 주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    keepLogin,
    loading,
    error,
    canSubmit,
    setEmail,
    setPassword,
    setKeepLogin,
    handleSubmit,
  };
}
