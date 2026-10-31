// 운동 카드 컴포넌트
import React from "react";
import morningImg from "../../../assets/sports/sp3.svg";
import lunchImg from "../../../assets/sports/sp4.svg";
import dinnerImg from "../../../assets/sports/sp5.svg";

const IMAGE_MAP = {
  아침: morningImg,
  점심: lunchImg,
  저녁: dinnerImg,
};

const S = {
  cardMaxW: "clamp(240px,34vw,400px)",  // 카드 전체 최대 너비
  imgH: "clamp(160px,24vmin,220px)",    // 이미지 영역 높이
  bodyMinH: "clamp(220px,40vmin,350px)",// 텍스트 영역 최소 높이
  bodyPx: "clamp(18px,2.5vmin,22px)",
  bodyPy: "clamp(14px,2.2vmin,18px)",
  bodyGap: "clamp(8px,1.3vmin,12px)",
  detailTop: "clamp(8px,4vmin,70px)",
  lineGap: "clamp(8px,2vmin,15px)",
  fsMain: "clamp(12px,1.8vmin,30px)",
};

export default function SpCard({ slotLabel, data }) {
  const totalDuration = data?.total_duration_min ?? "-";
  const totalCalorie = data?.total_calorie_kcal ?? "-";
  const exercises = data?.exercises || [];
  const image = IMAGE_MAP[slotLabel] || morningImg;

  return (
    <div
      className={`
        flex flex-col h-full
        w-full mx-auto
        rounded-[clamp(8px,1.5vmin,22px)]
        border-2 border-[#009689]
        bg-white overflow-hidden shadow-sm
      `}
      style={{ maxWidth: S.cardMaxW }}
    >
      {/* 상단 이미지 영역 */}
      <div
        className="relative bg-[#E5F4F2] overflow-hidden"
        style={{ height: S.imgH }}
      >
        {image && (
          <img
            src={image}
            alt={`${slotLabel} 운동`}
            className="w-full h-full object-cover"
          />
        )}

        {/* 아침/점심/저녁 라벨 */}
        <div className="absolute left-[clamp(12px,1.6vmin,16px)] bottom-[clamp(12px,1.6vmin,16px)] rounded-full bg-white text-[#101828] text-[clamp(11px,1.3vmin,13px)] px-[clamp(10px,1.6vmin,12px)] py-[clamp(4px,0.8vmin,6px)] border border-[#D0D5DD] shadow-sm">
          {slotLabel}
        </div>
      </div>

      {/* 하단 텍스트 영역 */}
      <div
        className="flex flex-col flex-1"
        style={{
          minHeight: S.bodyMinH,
          paddingInline: S.bodyPx,
          paddingBlock: S.bodyPy,
          rowGap: S.bodyGap,
        }}
      >
        {/* 카드 상단 요약 */}
        <div className="flex flex-wrap items-center gap-[clamp(6px,1vmin,8px)] text-[clamp(12px,1.6vmin,20px)] text-[#475467]">
          <span className="text-[#667085] font-semibold">총 운동시간</span>
          <span className="font-medium text-[#101828]">
            {totalDuration}분
          </span>
          <span className="h-[14px] w-px bg-[#D0D5DD]" />
          <span className="text-[#667085] font-semibold">총 칼로리</span>
          <span className="font-medium text-[#101828]">
            {totalCalorie} kcal
          </span>
        </div>

        {/* 세부 운동 목록 */}
        <div
          className="leading-relaxed flex flex-col"
          style={{
            marginTop: S.detailTop, // 위 여백
            rowGap: S.lineGap,      // 운동 블록 간 간격
            fontSize: S.fsMain,     // 기본 폰트 크기
          }}
        >
          {exercises.length === 0 ? (
            <p className="text-[#98A2B3]">
              추천 운동 정보가 아직 제공되지 않았어요.
            </p>
          ) : (
            exercises.map((ex, idx) => (
              <div
                key={`${ex.movement_name}-${idx}`}
                className="space-y-[6px]"
              >
                {ex.step_name && (
                  <p className="font-semibold text-[#009689]">
                    {ex.step_name}
                  </p>
                )}

                {/*글머리 동그라미 ,텍스트 */}
                <div className="flex items-start gap-[clamp(6px,1vmin,10px)]">
                  {/* 글머리*/}
                  <span
                    className="mt-[0.7em] inline-block rounded-full bg-[#475467]"
                    style={{
                      width: "clamp(3px,0.5vmin,10px)",
                      height: "clamp(3px,0.5vmin,10px)",
                    }}
                  />
                  {/* 운동 이름 + 시간/칼로리 */}
                  <p className="text-[#475467]">
                    <span className="text-[#101828]">
                      {ex.movement_name}
                    </span>
                    <span className="text-[#667085] font-semibold">
                      {" "}
                      ({ex.duration_min}분, {ex.calorie_kcal}kcal)
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
