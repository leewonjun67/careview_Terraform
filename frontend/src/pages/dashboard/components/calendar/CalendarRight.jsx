import React, { useState } from "react";
import { fmt } from "../../utils/dateUtils";
import InputList from "./InputList";
import InputForm from "./InputForm";

export default function CalendarRight({
  selected,
  tasks,
  addTask,
  toggleTask,
  removeTask,
}) {
  const selKey = fmt(selected);
  const selList = tasks[selKey] || [];
  const [isAdding, setIsAdding] = useState(false);

  const handleAddClick = () => setIsAdding(true);
  
  const handleSaveTask = (text) => {
    addTask(selKey, text);
    setIsAdding(false);
  };

  const handleCancelForm = () => setIsAdding(false);

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
      {/* 상단 날짜 + 추가 버튼 */}
      <div className="flex items-center justify-between gap-2">
        <h3 className="ml-[clamp(10px,4vmin,40px)] text-[clamp(12px,3.5vmin,40px)] font-semibold tracking-tight">
          {selected.getFullYear()}-
          {String(selected.getMonth() + 1).padStart(2, "0")}-
          {String(selected.getDate()).padStart(2, "0")} 할 일
        </h3>

        {!isAdding && (
          <button
            type="button"
            onClick={handleAddClick}
            className="
              px-3 py-1.5 rounded-md 
              bg-[#009689] hover:bg-[#008378] 
              text-white text-sm 
              focus:outline-none focus:ring-2 focus:ring-[#009689]/70
              whitespace-nowrap
            "
          >
            + 추가
          </button>
        )}
      </div>

      {/* 리스트 / placeholder */}
      <div className="mt-7 flex-1 overflow-auto max-h-[clamp(180px,28vmin,320px)] pr-1">
        <InputList
          items={selList}
          onRemove={(id) => removeTask(selKey, id)}
        />
      </div>

      {/* 하단 중앙 추가 */}
      {isAdding && (
        <InputForm onSave={handleSaveTask} onCancel={handleCancelForm} />
      )}
    </div>
  );
}
