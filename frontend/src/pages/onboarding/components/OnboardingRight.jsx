import React, { useMemo, useState } from "react";
import Step1 from "./step/Step1.jsx";
import Step2 from "./step/Step2.jsx";
import Step3 from "./step/Step3.jsx";
import Step4 from "./step/Step4.jsx";
import Step5 from "./step/Step5.jsx";
import Bottom from "./bottom/Bottom.jsx";

// 🔹 온보딩 API + 에러 메시지 유틸 추가
import {
  saveOnboardingStep1,
  saveOnboardingStep2,
  saveOnboardingStep3,
  saveOnboardingStep4,
  completeOnboarding,
} from "../../../api/onboarding";
import { getErrorMessage } from "../../../api/client";

const TK = {
  outer: "clamp(18px,4vw,72px)",
  title: "clamp(12px,2.2vmin,20px)",
  lead:  "clamp(16px,2.3vmin,20px)",
};

const HEAD = {
  offsetX: "clamp(10px, 2.5vw, 60px)", //오른쪽 이동
  offsetY: "clamp(8px, 2.5vh, 40px)",  //아래
  gap:     "clamp(8px, 2.2vmin, 18px)", //title lead
};

// 폼 상태
const initialState = {
  goal: null,
  schedule: {
    mon:{enabled:false,start:"",end:""}, tue:{enabled:false,start:"",end:""},
    wed:{enabled:false,start:"",end:""}, thu:{enabled:false,start:"",end:""},
    fri:{enabled:false,start:"",end:""}, sat:{enabled:false,start:"",end:""},
    sun:{enabled:false,start:"",end:""},
  },
  basic: { age:"", heightCm:"", weightKg:"" },
  job: { role:"" },
};

const toMin = (t) => { const [h,m]=t.split(":").map(Number); return h*60+m; };

const isStepComplete = (s, step) => {
  switch (step) {
    case 1: return !!s.goal;
    case 2: {
      const picked = Object.values(s.schedule).filter(d=>d.enabled);
      return (
        picked.length > 0 &&
        picked.every(d => d.start && d.end && toMin(d.start) < toMin(d.end))
      );
    }
    case 3: {
      const { age, heightCm, weightKg } = s.basic;
      return Number(age)>0 && Number(heightCm)>0 && Number(weightKg)>0;
    }
    case 4: return !!s.job.role;
    case 5: return true;
    default: return false;
  }
};

export default function OnboardingRight({ step: stepProp, onStepChange, onComplete }) {
  const [innerStep, setInnerStep] = useState(1);
  const step = stepProp ?? innerStep;

  const [state, setState] = useState(initialState);
  const setS = (fn) => setState(prev => (typeof fn === "function" ? fn(prev) : fn));

  const [submitting, setSubmitting] = useState(false);   // 🔹 API 요청 중 여부
  const [error, setError] = useState("");                // 🔹 에러 메시지

  const canNext = useMemo(
    () => isStepComplete(state, step),
    [state, step]
  );

  const goPrev = () => (onStepChange ?? setInnerStep)(Math.max(1, step - 1));

  // 🔹 현재 step에 맞는 API 호출
  const submitCurrentStep = async () => {
    if (step === 1) {
      await saveOnboardingStep1(state.goal);
    } else if (step === 2) {
      await saveOnboardingStep2(state.schedule);
    } else if (step === 3) {
      await saveOnboardingStep3(state.basic);
    } else if (step === 4) {
      await saveOnboardingStep4(state.job.role);
    }
  };

  // 🔹 [다음] 클릭 시: API 호출 후 성공하면 step 이동
  const goNext = async () => {
    if (!canNext || submitting) return;

    try {
      setSubmitting(true);
      setError("");

      await submitCurrentStep();

      (onStepChange ?? setInnerStep)(Math.min(5, step + 1));
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  // 🔹 Step5 [시작하기] 때: step5 API + onComplete 호출
  const handleStart = async () => {
    if (submitting) return false;

    try {
      setSubmitting(true);
      setError("");

      await completeOnboarding();

      if (onComplete) {
        onComplete(state);
      }

      // Bottom에서 true/false를 보고 대시보드 이동 여부 결정
      return true;
    } catch (err) {
      setError(getErrorMessage(err));
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  return (
    // 본문(스크롤) + 하단 바(항상 아래)에 분리
    <section className="min-h-dvh grid grid-rows-[1fr_auto] bg-white">
      {/* 본문 */}
      <div className="min-w-0 overflow-y-auto" style={{ padding: TK.outer }}>
        {/* ⬇️ 헤더를 아래/오른쪽으로 이동 */}
        <header
          className="mb-[clamp(12px,3vh,24px)]"
          style={{ marginTop: HEAD.offsetY, marginLeft: HEAD.offsetX }}
        >
          <div className="text-[#101828] font-semibold" style={{ fontSize: TK.title }}>
            {["건강 목표 선택","운동 가능 시간","기본 정보","직업 선택"][step-1]}
          </div>
          <p
            className="text-[#6A7282] font-medium"
            style={{ fontSize: TK.lead, marginTop: HEAD.gap }}
          >
            {step===1 && "당신의 목표에 맞춘 개인화된 플랜을 제공합니다"}
            {step===2 && "운동 가능한 요일과 시간을 선택해주세요"}
            {step===3 && "정확한 분석을 위해 나이·신장·체중을 입력하세요"}
            {step===4 && "라이프스타일에 맞는 건강 관리를 제공합니다"}
          </p>
        </header>

        <div className="space-y-[clamp(16px,3vh,28px)]">
          {step===1 && (
            <Step1
              value={state.goal}
              onChange={(v)=>setS(s=>({ ...s, goal: v }))}
            />
          )}
          {step===2 && (
            <Step2
              value={state.schedule}
              onChange={(v)=>setS(s=>({ ...s, schedule: v }))}
            />
          )}
          {step===3 && (
            <Step3
              value={state.basic}
              onChange={(v)=>setS(s=>({ ...s, basic: v }))}
            />
          )}
          {step===4 && (
            <Step4
              value={state.job}
              onChange={(v)=>setS(s=>({ ...s, job: v }))}
            />
          )}
          {step===5 && <Step5 />}

          {/* 🔹 에러 메시지 (있을 때만, 스타일 최소 침범) */}
          {error && (
            <p className="text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </div>

      {/* 하단 */}
      <Bottom
        step={step}
        total={5}
        canNext={canNext && !submitting}   // 전송 중일 때는 비활성
        onPrev={goPrev}
        onNext={goNext}
        onStart={handleStart}
        padX={TK.outer}
      />
    </section>
  );
}
