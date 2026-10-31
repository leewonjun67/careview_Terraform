// 상단 소개와 새로고침 버튼
import React from "react";

const H = {
  heroGap: "clamp(10px,3vmin,30px)",
  buttonPx: "clamp(8px,1.5vmin,20px)",   // 좌우 더 넓게
  buttonPy: "clamp(8px,1.5vmin,20px)",   // 위아래 더 두껍게
  buttonFs: "clamp(8px,1.5vmin,20px)", // 글자 더 크게
};

export default function SpHero({ loading, errorMsg, onReload }) {
  return (
    <section className="text-center space-y-[clamp(10px,4vmin,30px)]">
      <h1 className="text-[clamp(20px,3vmin,40px)] font-semibold text-[#101828]">
        오늘의 맞춤 운동
      </h1>
      <p className="text-[clamp(13px,2vmin,20px)] text-[#667085] ]">
        당신의 건강 목표 달성을 위해 분석한 최적의 운동입니다.
      </p>

      {/* 버튼 위아래 간격 */}
      <div className="flex justify-center mt-[clamp(16px,3.5vmin,32px)] mb-[clamp(6px,2vmin,18px)]">
        <button
          type="button"
          onClick={onReload}
          disabled={loading}
          // 🔹 크기/폰트는 style로 직접 적용 (clamp 그대로 사용 → 반응형)
          style={{
            fontSize: H.buttonFs,
            paddingInline: H.buttonPx,
            paddingBlock: H.buttonPy,
          }}
          className={`
            inline-flex items-center justify-center
            rounded-full bg-[#101828] text-white
            font-medium
            disabled:opacity-60 disabled:cursor-not-allowed
            hover:opacity-90 active:scale-[0.99]
            transition
          `}
        >
          {loading ? "추천 불러오는 중..." : "새로운 운동 추천받기"}
        </button>
      </div>

      {errorMsg && (
        <p className="mt-[clamp(6px,1.2vmin,14px)] text-[clamp(12px,1.6vmin,16px)] text-[#B42318]">
          {errorMsg}
        </p>
      )}
    </section>
  );
}
