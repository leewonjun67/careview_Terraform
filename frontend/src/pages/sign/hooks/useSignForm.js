//회원가입 상태 로직 훅
import { useState } from "react";
import { signUpUser } from "../../../api/user/sign";

export default function useSignForm({ onSuccess } = {}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordsMatch = pw && pw2 && pw === pw2;
  const requiredOK = Boolean(
    name.trim() && email.trim() && passwordsMatch && agreeTerms && agreePrivacy
  );

  const handleSubmit = async () => {
    if (!requiredOK || loading) return;

    try {
      setLoading(true);
      setError("");

      await signUpUser({
        name: name.trim(),
        email: email.trim(),
        password: pw,
        agreeTerms,
        agreePrivacy,
      });

      // 마케팅 동의 프론트에서만 사용
      console.log("마케팅 동의 여부:", agreeMarketing);

      onSuccess?.();
    } catch (err) {
      setError(
        err?.message ||
          "회원가입에 실패했어요. 입력값을 다시 확인하거나 잠시 후 다시 시도해 주세요."
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    email,
    pw,
    pw2,
    agreeTerms,
    agreePrivacy,
    agreeMarketing,
    loading,
    error,
    passwordsMatch,
    requiredOK,
    setName,
    setEmail,
    setPw,
    setPw2,
    setAgreeTerms,
    setAgreePrivacy,
    setAgreeMarketing,
    handleSubmit,
  };
}
