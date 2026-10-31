import React from "react";
import { useNavigate } from "react-router-dom";
import nextIcon  from "../../../../assets/onboarding/ob2.svg"; 
import startIcon from "../../../../assets/onboarding/ob4.svg";

export default function Bottom({
  step,
  total = 5,
  canNext,
  onPrev,
  onNext,
  onStart,
  padX = "clamp(18px,4vw,72px)",
}) {
  const navigate = useNavigate();
  const handleStart = async () => {
    if (typeof onStart === "function") {
      const ok = await onStart();   // onStart가 false를 리턴하면 이동 안 함
      if (ok === false) return;
    }
    navigate("/dashboard");
  };

  return (
    <footer className="bg-white border-t-2" style={{ borderColor: "#E5E7EB" }}>
      <div
        className="flex items-center justify-between"
        style={{ padding: `clamp(10px,2vh,14px) ${padX}` }}
      >
        {/* 이전 */}
        <button
          type="button"
          onClick={onPrev}
          disabled={step === 1}
          className={[
            "text-[#4A5565]",
            step === 1 ? "opacity-40 cursor-not-allowed" : "hover:opacity-80",
          ].join(" ")}
        >
          이전
        </button>

        {/* 진행 바 */}
        <ProgressDots current={step} total={total} />

        {/* 다음,시작하기 */}
        {step < total ? (
          <img
            src={nextIcon}
            alt="다음"
            onClick={canNext ? onNext : undefined}
            className={[
              "select-none",
              canNext
                ? "cursor-pointer hover:opacity-90"
                : "opacity-40 pointer-events-none",
            ].join(" ")}
            style={{ width: "clamp(72px,8vmin,96px)" }}
          />
        ) : (
          <img
            src={startIcon}
            alt="시작하기"
            onClick={handleStart}
            className="select-none cursor-pointer hover:opacity-90"
            style={{ width: "clamp(96px,10vmin,120px)" }}
          />
        )}
      </div>
    </footer>
  );
}

function ProgressDots({ current, total }) {
  const w = "clamp(24px,5vmin,46px)";
  const h = "clamp(6px,0.9vmin,8px)";
  return (
    <div className="flex items-center gap-[clamp(8px,1.4vmin,14px)]">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={["rounded-full", i < current ? "bg-[#0B5D51]" : "bg-gray-300"].join(" ")}
          style={{ width: w, height: h }}
        />
      ))}
    </div>
  );
}
