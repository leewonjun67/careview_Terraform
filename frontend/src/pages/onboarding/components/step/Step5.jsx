import React from "react";
import doneIcon from "../../../../assets/onboarding/ob5.svg";

export default function Step5() {
  const ITEMS = [
    { emoji: "🤖", title: "AI 분석", desc: "맞춤형 솔루션" },
    { emoji: "⏰", title: "24/7",  desc: "실시간 모니터링" },
    { emoji: "💪", title: "100+",  desc: "운동 프로그램" },
  ];

  const S = {
    headTop: "clamp(8px,5vh,80px)",
    gridGap: "clamp(6px,1.7vmin,20px)",
    cardPad: "clamp(20px,2.9vmin,24px)",
    cardW:   "clamp(80px,18vw,180px)",
    cardH:   "clamp(220px,27vmin,280px)",
    emoji:   "clamp(35px,6vmin,100px)",
    title:   "clamp(4px,2.1vmin,18px)",
    desc:    "clamp(16px,2vmin,30px)",
  };

  return (
    <div className="w-full">
      {/* 상단 아이콘/텍스트 */}
      <div
        className="grid place-items-center"
        style={{ marginTop: S.headTop }}
      >
        <img
          src={doneIcon}
          alt=""
          className="w-[clamp(50px,9vmin,120px)] h-auto mb-[clamp(10px,1.6vmin,14px)]"
          draggable="false"
        />
        <div className= "font-semibold text-[#101828] text-[clamp(13px,2.0vmin,20px)]">
          모든 준비 완료
        </div>
        <p className="text-[#6A7282] font-medium  mt-[20px] text-center text-[clamp(12px,2.7vmin,18px)]">
          이제 AI 기반 맞춤형 건강 관리를 시작할 수 있습니다
        </p>
      </div>

      {/* 하단 3카드 */}
      <div
      className="mt-[clamp(90px,13vh,120px)]"
      style={{
        maxWidth: "min(92vw,980px)",
        marginLeft: "clamp(12px,6vw,180px)",
      }}>
        <div
          className="grid grid-cols-1 sm:grid-cols-3 justify-start"
          style={{ gap: S.gridGap }}
        >
          {ITEMS.map((it) => (
            <div
              key={it.title}
              className="bg-white border-2 border-[#E5E7EB] rounded-none grid place-items-center text-center"
              style={{ width: S.cardW, height: S.cardH, padding: S.cardPad }}
            >
              {/* 아이콘 */}
              <div aria-hidden style={{ fontSize: S.emoji }} className="mb-[clamp(8px,1.5vmin,12px)]">
                {it.emoji}
              </div>
              {/* 아래 날짜 */}
              <div className="font-semibold text-[#101828]" style={{ fontSize: S.title }}>
                {it.title}
              </div>
              {/* 아래 소제목 */}
              <div
                className="text-[#6A7282] font-medium leading-relaxed mt-[clamp(4px,1vmin,8px)]"
                style={{ fontSize: S.desc }}
              >
                {it.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
