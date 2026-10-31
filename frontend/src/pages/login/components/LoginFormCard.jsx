//로그인 전체 카드
import React from "react";
import loginBtn from "../../../assets/login/login5.svg";
import googleBtn from "../../../assets/login/login6.svg";
import useLoginForm from "../hooks/useLoginForm";
import SignButton from "../../sign/components/SignButton";
import SignTextField from "../../sign/components/SignTextField";
import LoginOptions from "./LoginOptions";
import {
  LOGIN_INPUT_WIDTH as W,
  LOGIN_CARD_WIDTH as CARD_W,
  LOGIN_CARD_MIN_HEIGHT as CARD_H,
  LOGIN_GAP_LOGIN_TO_OR as GAP_LOGIN_TO_OR,
  LOGIN_GAP_OR_TO_GOOGLE as GAP_OR_TO_GOOGLE,
} from "../constants/loginLayout";

export default function LoginFormCard({ onGoToMain, onGoToOnboarding }) {
  const {
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
  } = useLoginForm({ onGoToMain, onGoToOnboarding });

  const handleGoogle = () => {
    console.log("Google 로그인은 아직 준비 중입니다.");
  };

  return (
    <div
      className="mx-auto mt-4 rounded-[16px] bg-white shadow-[0_8px_24px_rgba(2,6,23,0.06)] border border-[#E5E7EB] flex flex-col items-center"
      style={{
        width: CARD_W,
        minHeight: CARD_H,
        padding: "clamp(16px, 3.5vmin, 28px)",
        boxSizing: "border-box",
      }}
    >
      {/* 이메일 */}
      <SignTextField
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="hello@example.com"
        iconVariant="email"
      />

      {/* 비밀번호 */}
      <SignTextField
        label="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="••••••"
        iconVariant="password"
        labelMarginTop="clamp(12px, 2.8vmin, 18px)"
        inputProps={{
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          },
        }}
      />

      {/* 옵션 라인 (로그인 상태 유지 / 비밀번호 찾기) */}
      <LoginOptions keepLogin={keepLogin} setKeepLogin={setKeepLogin} />

      {/* 에러 메시지 */}
      {error && (
        <p
          className="self-center text-center text-[#DC2626]"
          style={{
            width: W,
            marginTop: "clamp(10px, 2.4vmin, 16px)",
            fontSize: "clamp(12px, 2.3vmin, 14px)",
          }}
        >
          {error}
        </p>
      )}

      {/* 로그인 버튼 */}
      <div
        className="self-center"
        style={{ width: W, marginTop: "clamp(14px, 3vmin, 20px)" }}
      >
        <SignButton
          src={loginBtn}
          alt="로그인하기"
          onClick={handleSubmit}
          disabled={!canSubmit || loading}
        />
      </div>

      {/* 구분선/문구 */}
      <div
        className="relative self-center"
        style={{
          width: W,
          marginTop: GAP_LOGIN_TO_OR,
          marginBottom: GAP_OR_TO_GOOGLE,
        }}
      >
        <div className="h-px bg-[#E5E7EB]" />
        <span
          className="absolute left-1/2 -translate-x-1/2 bg-white text-[#9CA3AF]"
          style={{
            top: "clamp(-8px, -1.8vmin, -10px)",
            padding: "0 clamp(8px, 2.1vmin, 11px)",
            fontSize: "clamp(11px, 2.1vmin, 13px)",
          }}
        >
          또는
        </span>
      </div>

      {/* Google 버튼 */}
      <div className="self-center" style={{ width: W }}>
        <SignButton
          src={googleBtn}
          alt="Google로 계속하기"
          onClick={handleGoogle}
          disabled={loading}
        />
      </div>
    </div>
  );
}
