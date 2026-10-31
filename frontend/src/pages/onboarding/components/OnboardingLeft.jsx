import React from "react";
import bg from "../../../assets/onboarding/ob1.svg";
import logo from "../../../assets/onboarding/ob3.svg";

export const ONBOARDING_STEP_LABELS = [
  "목표 설정",
  "운동 스케줄",
  "기본 정보",
  "직업 정보",
  "완료",
];

const KNOBS = {
  logoH: "clamp(60px, 9.2vmin, 86px)",
  circle: "clamp(20px, 5.2vmin, 80px)",
  circleFont: "clamp(14px, 1.8vmin, 20px)",
  labelFont: "clamp(15px, 1.9vmin, 22px)",
  itemGap: "clamp(20px, 2.0vmin, 30px)",
  listSpaceY: "clamp(20px, 3.5vh, 38px)",
  padL: "clamp(25px, 5vw, 70px)",
  padR: "clamp(16px, 2.8vw, 40px)",
  topPad: "clamp(30px, 4.2vw, 80px)",
  bottomPad: "clamp(20px, 3.2vh, 36px)",
};

const FOOTER_TEXTS = {
  1: {
    line1: "건강한 삶의 시작, 목표를 설정하세요",
    line2:
      "목표 달성을 위한 첫 단계입니다.\nAI기반 분석으로 당신만의 건강 관리 플랜을 만들어드립니다.",
  },
  2: {
    line1: "일상에 맞는 운동 계획",
    line2:
      "바쁜 일정 속에서도 건강을 챙길 수 있도록\n최적의 운동 시간을 추천해드립니다.",
  },
  3: {
    line1: "개인 맞춤 건강 관리",
    line2:
      "정확한 신체 정보를 통해 더욱 정밀한 건강 분석과 관리가 가능합니다.",
  },
  4: {
    line1: "라이프스타일에 맞춘 솔루션",
    line2:
      "학생과 직장인의 서로 다른 라이프스타일을 고려한\n맞춤형 플랜을 제공합니다.",
  },
  5: {
    line1: "준비 완료. 새로운 시작",
    line2:
      "모든 설정이 완료되었습니다.\n지금부터 AI와 함께 건강한 여정을 시작하세요.",
  },
};

export default function OnboardingLeft({ currentStep = 1 }) {
  const stepTexts = FOOTER_TEXTS[currentStep] ?? FOOTER_TEXTS[1];

  return (
    <aside className="relative min-h-dvh text-white overflow-hidden">
      <img src={bg} alt="" className="absolute inset-0 w-full h-full object-cover" draggable="false" />

      <div className="relative flex flex-col h-full">
        <div
          className="pt-[var(--topPad)] pl-[var(--padL)] pr-[var(--padR)]"
          style={{ ["--padL"]: KNOBS.padL, ["--padR"]: KNOBS.padR, ["--topPad"]: KNOBS.topPad }}
        >
          <img src={logo} alt="Care View" className="select-none" style={{ height: KNOBS.logoH }} draggable="false" />
        </div>

        <ol className="grow pl-[var(--padL)] pr-[var(--padR)]" style={{ ["--padL"]: KNOBS.padL, ["--padR"]: KNOBS.padR }}>
          <div className="mt-[clamp(18px,4vh,44px)] space-y-[var(--listSpaceY)]" style={{ ["--listSpaceY"]: KNOBS.listSpaceY }}>
            {ONBOARDING_STEP_LABELS.map((label, idx) => {
              const step = idx + 1;
              const active = step === currentStep;
              const done = step < currentStep && step !== ONBOARDING_STEP_LABELS.length;

              return (
                <li key={label} className="flex items-center" style={{ gap: KNOBS.itemGap }} aria-current={active ? "step" : undefined}>
                  <span
                    className={[
                      "grid place-items-center rounded-full border select-none shrink-0",
                      active
                        ? "bg-white text-[#0B5D51] border-white shadow-[0_0_0_3px_rgba(255,255,255,0.35)]"
                        : done
                        ? "bg-white/25 text-white border-white/60"
                        : "text-white/90 border-white/45",
                    ].join(" ")}
                    style={{ width: KNOBS.circle, height: KNOBS.circle, fontSize: KNOBS.circleFont, fontWeight: 700 }}
                  >
                    {step}
                  </span>

                  <span className={["leading-snug", active ? "font-semibold" : "opacity-95"].join(" ")} style={{ fontSize: KNOBS.labelFont }}>
                    {label}
                  </span>
                </li>
              );
            })}
          </div>
        </ol>

        <div
          className="pl-[var(--padL)] pr-[var(--padR)] pb-[var(--bottomPad)]"
          style={{ ["--padL"]: KNOBS.padL, ["--padR"]: KNOBS.padR, ["--bottomPad"]: KNOBS.bottomPad }}
        >
          <p className="text-[clamp(14px,1.6vmin,20px)] font-semibold">{stepTexts.line1}</p>
          <p
            className="mt-[clamp(25px,2.5vmin,40px)] text-[clamp(15px,2.0vmin,30px)] opacity-95 leading-relaxed"
            style={{ whiteSpace: "pre-line" }}
          >
            {stepTexts.line2}
          </p>
        </div>
      </div>
    </aside>
  );
}
