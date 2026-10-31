import React, { useState } from "react";
import { TIME_OPTIONS } from "../../utils/calendarOptions";

export default function InputForm({ onSave, onCancel }) {
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("09:30");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const reset = () => {
    setStartTime("09:00");
    setEndTime("09:30");
    setTitle("");
    setContent("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    // 시작 ~ 종료. 제목 형식
    const label = `${startTime} ~ ${endTime}. ${title.trim()}`;
    const body = content.trim();
    const text = body ? `${label}\n${body}` : label;

    onSave(text);
    reset();
  };

  const handleCancelClick = () => {
    reset();
    onCancel();
  };

  return (
    <div className="mt-4 flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[460px] flex flex-col gap-3"
      >
        {/* 시간 선택 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1">
            <label className="text-[clamp(12px,1.5vmin,60px)] font-semibold text-gray-700">
              시작 시간
            </label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="
                h-9 rounded-md border border-gray-300 
                text-[clamp(12px,1.6vmin,14px)]
                px-2
                focus:outline-none focus:ring-2 focus:ring-[#009689]
              "
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[clamp(12px,1.5vmin,60px)] font-semibold text-gray-700">
              종료 시간
            </label>
            <select
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="
                h-9 rounded-md border border-gray-300 
                text-[clamp(12px,1.6vmin,14px)]
                px-2
                focus:outline-none focus:ring-2 focus:ring-[#009689]
              "
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 제목 */}
        <div className="flex flex-col gap-1">
          <label className="text-[clamp(12px,1.5vmin,14px)] font-semibold text-gray-700">
            제목
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 아침 운동, 식단 준비 등"
            className="
              h-9 rounded-md border border-gray-300 
              text-[clamp(12px,1.6vmin,14px)]
              px-2
              focus:outline-none focus:ring-2 focus:ring-[#009689]
            "
          />
        </div>

        {/* 내용부분 */}
        <div className="flex flex-col gap-1">
          <label className="text-[clamp(12px,1.5vmin,14px)] font-semibold text-gray-700">
            내용
          </label>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 간단하게 적어주세요."
            className="
              h-9 rounded-md border border-gray-300 
              text-[clamp(12px,1.6vmin,14px)]
              px-2
              focus:outline-none focus:ring-2 focus:ring-[#009689]
            "
          />
        </div>

        {/* 버튼 영역 */}
        <div className="flex justify-center gap-3 pt-1">
          <button
            type="button"
            onClick={handleCancelClick}
            className="
              px-3 py-1.5 rounded-md 
              bg-gray-100 hover:bg-gray-200 
              text-[clamp(12px,1.6vmin,14px)]
              text-gray-700
              focus:outline-none focus:ring-1 focus:ring-gray-300
            "
          >
            취소
          </button>
          <button
            type="submit"
            className="
              px-3 py-1.5 rounded-md 
              bg-[#009689] hover:bg-[#008378] 
              text-white
              text-[clamp(12px,1.6vmin,14px)]
              focus:outline-none focus:ring-2 focus:ring-[#009689]/70
            "
          >
            저장
          </button>
        </div>
      </form>
    </div>
  );
}
