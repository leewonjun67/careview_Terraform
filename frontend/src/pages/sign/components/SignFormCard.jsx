//전체 폼 카드(컴포넌트들을 전부 임포트함)
import React from "react";
import signBtn from "../../../assets/sign/sign.svg";
import googleBtn from "../../../assets/login/login6.svg";
import useSignForm from "../hooks/useSignForm";
import SignButton from "./SignButton";
import SignTextField from "./SignTextField";
import SignCheckbox from "./SignCheckbox";
import {
  SIGN_INPUT_WIDTH as W,
  SIGN_CARD_WIDTH as CARD_W,
  SIGN_CARD_MIN_HEIGHT as CARD_H,
  SIGN_GAP_LOGIN_TO_OR as GAP_LOGIN_TO_OR,
  SIGN_GAP_OR_TO_GOOGLE as GAP_OR_TO_GOOGLE,
} from "../constants/signLayout";

export default function SignFormCard({ onSuccess }) {
  const {
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
  } = useSignForm({ onSuccess });

  const handleGoogle = () => {
    console.log("Google 회원가입은 아직 준비 중입니다.");
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
      {/* 이름 */}
      <SignTextField
        label="이름"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="홍길동"
        iconVariant="user"
      />

      {/* 이메일 */}
      <SignTextField
        label="이메일"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="hello@example.com"
        iconVariant="email"
        labelMarginTop="clamp(10px, 2.6vmin, 14px)"
      />

      {/* 비밀번호 */}
      <SignTextField
        label="비밀번호"
        type="password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        placeholder="숫자·문자 포함 8자 이상"
        iconVariant="password"
        labelMarginTop="clamp(12px, 2.8vmin, 18px)"
      />

      {/* 비밀번호 확인 */}
      <SignTextField
        label="비밀번호 확인"
        type="password"
        value={pw2}
        onChange={(e) => setPw2(e.target.value)}
        placeholder="다시 입력해주세요"
        iconVariant="password"
        labelMarginTop="clamp(12px, 2.8vmin, 18px)"
      />

      {/* 비밀번호 불일치 안내 */}
      {pw2 && !passwordsMatch && (
        <p
          className="self-center text-center text-[#DC2626]"
          style={{
            width: W,
            marginTop: "clamp(6px, 1.6vmin, 8px)",
            fontSize: "clamp(12px, 2.1vmin, 13px)",
          }}
        >
          비밀번호가 일치하지 않습니다.
        </p>
      )}

      {/* 체크박스들 */}
      <div
        className="self-center"
        style={{ width: W, marginTop: "clamp(12px, 2.8vmin, 18px)" }}
      >
        <SignCheckbox
          badgeLabel="필수"
          text="이용약관 동의"
          checked={agreeTerms}
          onChange={setAgreeTerms}
          marginTop="clamp(4px, 1.2vmin, 6px)"
        />
        <SignCheckbox
          badgeLabel="필수"
          text="개인정보 처리방침 동의"
          checked={agreePrivacy}
          onChange={setAgreePrivacy}
          marginTop="clamp(6px, 1.4vmin, 8px)"
        />
        <SignCheckbox
          badgeLabel="선택"
          text="마케팅 정보 수신 동의"
          checked={agreeMarketing}
          onChange={setAgreeMarketing}
          marginTop="clamp(6px, 1.4vmin, 8px)"
        />
      </div>

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

      {/* 회원가입 버튼 */}
      <div
        className="self-center"
        style={{ width: W, marginTop: "clamp(14px, 3vmin, 20px)" }}
      >
        <SignButton
          src={signBtn}
          alt="회원가입하기"
          onClick={handleSubmit}
          disabled={!requiredOK || loading}
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
