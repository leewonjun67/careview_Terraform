import React, { useState } from "react";
import iconRe2 from "../../../../assets/refood/re2.svg";

const S = {
  cardPad: "clamp(14px, 2.4vmin, 22px)",
  titleFS: "clamp(14px, 1.9vmin, 18px)",
  subFS: "clamp(12px, 1.5vmin, 15px)",
  inputH: "clamp(40px, 5.4vmin, 52px)",
  inputFS: "clamp(12px, 1.6vmin, 15px)",
  chipFS: "clamp(11px, 1.4vmin, 14px)",
  gap: "clamp(8px, 1.5vmin, 14px)",
  searchH: "clamp(46px, 6vmin, 56px)",
};

export default function ReInputCard({
  items = [],
  onAdd,
  onRemove,
  onSearch,
}) {
  const [val, setVal] = useState("");

  const handleAdd = () => {
    const v = val.trim();
    if (!v) return;
    onAdd?.(v);
    setVal("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <section
      className="bg-white/70 border-2 border-[#D1D5DC] rounded-2xl"
      style={{ padding: S.cardPad }}
    >
      {/* 제목 */}
      <div className="flex items-start gap-[clamp(8px,1.2vmin,10px)]">
        <img
          src={iconRe2}
          alt=""
          className="h-auto select-none flex-none"
          draggable="false"
        />
        <div className="flex-1">
          <div
            className="text-[#1E2939] font-semibold"
            style={{ fontSize: S.titleFS }}
          >
            냉장고 재료 입력
          </div>
          <div
            className="text-[#4A5565] mt-[clamp(2px,0.6vmin,4px)]"
            style={{ fontSize: S.subFS }}
          >
            집에 있는 재료를 입력하면 만들 수 있는 건강 요리를 추천해드립니다
          </div>
        </div>
      </div>

      {/* 입력 필드 */}
      <div
        className="mt-[clamp(12px,2vmin,16px)] flex items-center"
        style={{ gap: S.gap }}
      >
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="재료를 입력하세요 (예: 계란, 토마토, 닭가슴살)"
          className="flex-1 bg-white/60 border-2 border-[#D1D5DC] rounded-xl outline-none px-[clamp(10px,1.8vmin,14px)]"
          style={{ height: S.inputH, fontSize: S.inputFS }}
        />

        <button
          type="button"
          onClick={handleAdd}
          className="bg-[#1E2939] text-white rounded-xl font-medium shrink-0 px-[clamp(12px,2vmin,16px)]"
          style={{ height: S.inputH, fontSize: S.inputFS }}
        >
          + 추가
        </button>
      </div>

      {/* 선택된 재료 컨테이너 */}
      <div className="mt-[clamp(12px,2vmin,16px)] rounded-xl bg-[#F3F4F6] p-[clamp(10px,1.8vmin,14px)]">
        <div className="text-[#1E2939] font-medium text-[clamp(12px,1.5vmin,14px)]">
          선택된 재료 ({items.length}개)
        </div>

        {items.length > 0 ? (
          <div
            className="mt-[clamp(8px,1.2vmin,10px)] flex flex-wrap"
            style={{ gap: "clamp(6px,1.2vmin,10px)" }}
          >
            {items.map((it) => (
              <button
                key={it}
                type="button"
                onClick={() => onRemove?.(it)}
                className="bg-white border border-[#D1D5DC] rounded-full px-[clamp(10px,1.6vmin,14px)] py-[clamp(4px,0.9vmin,6px)] text-[#1E2939] hover:bg-[#F9FAFB] transition"
                style={{ fontSize: S.chipFS }}
                title="클릭하면 삭제"
              >
                {it} <span className="ml-[4px] opacity-60">×</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-[clamp(6px,1vmin,8px)] text-[#4A5565] text-[clamp(11px,1.4vmin,13px)]">
            아직 추가된 재료가 없어요.
          </div>
        )}
      </div>

      {/* 검색 버튼 */}
      <button
        type="button"
        onClick={() => onSearch?.()}
        disabled={items.length === 0}
        className={`mt-[clamp(12px,2vmin,16px)] w-full rounded-xl font-medium transition
          ${
            items.length === 0
              ? "bg-[#1E2939]/40 text-white cursor-not-allowed"
              : "bg-[#1E2939] text-white hover:bg-[#111827]"
          }`}
        style={{ height: S.searchH, fontSize: S.inputFS }}
      >
        레시피 검색하기
      </button>
    </section>
  );
}
