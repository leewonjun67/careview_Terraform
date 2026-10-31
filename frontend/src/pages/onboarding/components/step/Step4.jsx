import React from "react";
import stuIcon  from "../../../../assets/onboarding/ob8.svg";
import workIcon from "../../../../assets/onboarding/ob9.svg";

const cardBase =
  "w-full text-left bg-white border-2 transition hover:shadow-md " +
  "flex items-center gap-[clamp(12px,5vmin,40px)]";

export default function Step4({ value, onChange }) {
  const Card = ({ role, icon, title, desc }) => {
    const active = value.role === role;
    return (
      <button
        type="button"
        onClick={() => onChange({ role })}
        className={[
          cardBase,
          active ? "border-[#009689]" : "border-[#E5E7EB]",
        ].join(" ")}
        style={{
          padding: "clamp(30px,5vmin,60px)",          
          minHeight: "clamp(110px,18vmin,160px)",     
        }}
      >
        <img
          src={icon}
          alt=""
          className="w-[clamp(22px,3.7vmin,40px)] h-auto mt-[1px]"
          draggable="false"
        />
        <div className="min-w-0">
          <div className="font-semibold text-[#111827] text-[clamp(18px,2.3vmin,24px)]">
            {title}
          </div>
          <div className="text-[#6B7280] mt-[6px] text-[clamp(15px,1.9vmin,20px)]">
            {desc}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="mx-auto w-full px-[clamp(9px,2.8vw,70px)] mt-[clamp(30px,12vh,140px)] grid gap-[clamp(40px,4vmin,80px)]">
      <Card role="student" icon={stuIcon}  title="학생"   desc="시험 기간과 학업 일정을 고려한 맞춤 관리" />
      <Card role="worker"  icon={workIcon} title="직장인" desc="업무 스케줄에 최적화된 건강 관리" />
    </div>
  );
}
