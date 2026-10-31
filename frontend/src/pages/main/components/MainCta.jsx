import React from "react";
import main2 from "../../../assets/main/main2.svg";
import MainLoginButton from "./MainLoginButton.jsx";
import MainSignupButton from "./MainSignupButton.jsx";
import MainStartButton from "./MainStartButton.jsx";

const S = {
  imgW: "clamp(260px, 40vw, 900px)",
  padX: "clamp(4px, 6vw, 80px)", //양옆
  padY: "clamp(24px, 8vh, 80px)", //위아래
  colGap: "clamp(40px, 10vw, 160px)", //간격
  rowGap: "clamp(32px, 7vh, 70px)",
  // 제목,본문 폰트,줄간격
  titleFS: "clamp(20px, 6vmin, 80px)",
  titleLH: "clamp(28px, 6vmin, 80px)",
  bodyFS: "clamp(12px, 2.5vmin, 40px)",
  bodyLH: "clamp(20px, 2.5vmin, 40px)",
  // 내부 간격
  titleToBody: "clamp(10px, 4.5vh, 60px)",
  bodyToButtons: "clamp(24px, 5vh, 60px)",
  loginToSignup: "clamp(20px, 4vh, 50px)",
};

//하단영역
export default function MainCta({
  loginHref = "/login",
  signupHref = "/sign",
}) {
  // 로그인 여부: cv-auth 기준
  const isLoggedIn = (() => {
    if (typeof window === "undefined") return false;
    try {
      const raw = window.localStorage.getItem("cv-auth");
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      return !!parsed?.accessToken;
    } catch {
      return false;
    }
  })();

  return (
    <div className="w-full">
      <div
        className="
          w-full
          grid
          grid-cols-1
          lg:grid-cols-2
          items-center
        "
        style={{
          paddingInline: S.padX,   // 양옆 여백
          paddingBlock: S.padY,    // 위아래 여백
          columnGap: S.colGap,     // 이미지 ↔ 텍스트 간격
          rowGap: S.rowGap,        // 세로 간격
        }}
      >
        {/* 왼쪽 이미지 */}
        <div className="flex justify-center">
          <img
            src={main2}
            alt="메인 섹션 이미지"
            style={{ width: S.imgW }}
            className="h-auto rounded-2xl shadow-xl object-cover select-none"
            draggable="false"
          />
        </div>

        {/* 텍스트 + 버튼 */}
        <div className="flex justify-center">
          <div className="flex flex-col items-center text-center">
            {/* 제목 */}
            <h3
              className="font-bold text-gray-800"
              style={{
                fontSize: S.titleFS,
                lineHeight: S.titleLH,
                marginBottom: S.titleToBody,
              }}
            >
              시작하기
            </h3>

            {/* 설명 문구 */}
            <p
              className="text-[#4B5563]"
              style={{
                fontSize: S.bodyFS,
                lineHeight: S.bodyLH,
                opacity: 0.9,
                marginBottom: S.bodyToButtons,
              }}
            >
              Care View와 함께 건강한 삶을 관리하세요
            </p>

            {/* 버튼 영역 */}
            <div
              className="flex flex-col items-center"
              style={{ lineHeight: 0 }}
            >
              {isLoggedIn ? (
                // 대시보드 버튼
                <MainStartButton href="/dashboard" />
              ) : (
                // 로그인 + 회원가입 버튼
                <>
                  <div
                    style={{
                      marginBottom: S.loginToSignup,
                    }}
                  >
                    <MainLoginButton href={loginHref} />
                  </div>
                  <div>
                    <MainSignupButton href={signupHref} />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 