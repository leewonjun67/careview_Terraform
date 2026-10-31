import React from "react";
import { fmt } from "../../utils/dateUtils";

export default function CalendarLeft({
  cursor,
  setCursor,
  selected,
  setSelected,
  days,
  tasks,
}) {
  return (
    <div
      className="
        mx-auto
        bg-white
        rounded-[clamp(12px,1.7vmin,18px)]
        shadow-[0_14px_40px_rgba(15,23,42,0.12)]
        ring-3 ring-black/7
        px-[clamp(2px,2vmin,10px)]
        py-[clamp(16px,2.8vmin,24px)]
        w-[clamp(350px,85vmin,1000px)]
        min-h-[clamp(450px,75vmin,1400px)]
        flex flex-col
      "
    >
      <div className="flex items-center justify-between">
        {/* 상단 년 월 */}
        <h3 className="ml-[clamp(11px,4.5vmin,40px)] text-[clamp(12px,3.5vmin,40px)] font-semibold">
          {cursor.getFullYear()}년 {cursor.getMonth() + 1}월
        </h3>
        <div className="flex gap-2">
          <button
            type="button"
            className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-400 text-[clamp(11px,2vmin,30px)]"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
            }
            aria-label="이전 달"
          >
            이전
          </button>
          <button
            type="button"
            className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-400 text-[clamp(11px,2vmin,30px)]"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }
            aria-label="다음 달"
          >
            다음
          </button>
        </div>
      </div>

      {/* 요일 헤더 */}
      <div className="mt-[clamp(10px,2.5vmin,30px)] grid grid-cols-7 text-center text-[clamp(10px,2vmin,30px)] text-gray-600 font-semibold">
        {["월", "화", "수", "목", "금", "토", "일"].map((d) => (
          <div key={d} className="py-[clamp(6px,1.2vmin,12px)]">
            {d}
          </div>
        ))}
      </div>

      {/* 날짜 그리드 */}
      <div className="grid grid-cols-7 gap-[clamp(3px,0.7vmin,6px)] mt-[clamp(4px,0.8vmin,8px)] flex-1">
        {days.map((d, i) => {
          if (!d) {
            return (
              <div
                key={i}
                className="h-[clamp(40px,6vmin,80px)] rounded-lg bg-transparent"
              />
            );
          }

          const key = fmt(d);
          const isToday = fmt(new Date()) === key;
          const isSelected = fmt(selected) === key;
          const hasTasks = (tasks[key]?.length ?? 0) > 0;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(d)}
              className={[
                "h-[clamp(42px,7vmin,80px)] rounded-lg border text-[clamp(12px,1.5vmin,15px)] flex flex-col items-center justify-center transition-colors",
                isSelected
                  ? "bg-[#E0F4F2] border-[#009689]"
                  : "bg-white border-gray-200 hover:bg-gray-50",
              ].join(" ")}
            >
              {/* 오늘 날짜 텍스트도 녹색 계열로 */}
              <span
                className={`leading-none ${
                  isToday ? "text-[#009689] font-semibold" : ""
                }`}
              >
                {d.getDate()}
              </span>
              {hasTasks && (
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[#009689]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
