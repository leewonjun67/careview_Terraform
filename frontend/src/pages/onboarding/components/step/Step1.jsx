import React from "react";
import fatIcon  from "../../../../assets/onboarding/ob6.svg";
import musIcon  from "../../../../assets/onboarding/ob7.svg";

const cardBase =
  "w-full text-left bg-white border transition hover:shadow-md rounded-none " +
  "flex items-center gap-[clamp(12px,5vmin,40px)] ";

export default function Step1({ value, onChange }) {
  const Card = ({ active, icon, title, desc, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={[
        cardBase,
        active ? "border-2 border-[#009689]" : "border-2 border-[#E5E7EB]",
      ].join(" ")}
      style={{
        padding: "clamp(12px,2.9vmin,24px)",
        borderRadius: "clamp(16px, 2.2vmin, 24px)",
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

  return (
    <div className="mx-auto w-full px-[clamp(9px,2.8vw,70px)] mt-[clamp(30px,12vh,140px)] grid gap-[clamp(24px,3vmin,40px)]">
      <Card
        active={value === "fat_loss"}
        icon={fatIcon}
        title="체지방률 감소"
        desc="건강한 체중 관리를 위해 체지방 감소를 목표로 합니다."
        onClick={() => onChange("fat_loss")}  
      />
      <Card
        active={value === "muscle_gain"}
        icon={musIcon}
        title="근육량 증가"
        desc="체계적인 근력 운동과 근육 성장을 목표로 합니다."
        onClick={() => onChange("muscle_gain")} 
      />
    </div>
  );
}
