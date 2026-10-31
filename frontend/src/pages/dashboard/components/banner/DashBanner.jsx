import React from "react";
import das1 from "../../../../assets/dashboard/das1.svg";

export default function DashBanner() {
  return (
    <section
      aria-label="대시보드 상단 배너"
      className="
        w-full
        mt-[clamp(80px,10vmin,120px)] 
        px-[clamp(16px,5vw,40px)] 
      "
    >
        <img
          src={das1}
          alt="매일의 컨디션에 최적화된 움직임, 당신을 위한 AI 트레이너"
          className="
            w-full 
            h-auto                 
            rounded-[clamp(14px,1.8vmin,18px)]
            block
          "
          draggable="false"
        />
    </section>
  );
}
