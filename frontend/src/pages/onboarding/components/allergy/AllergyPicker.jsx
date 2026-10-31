import React from "react";
import { ALLERGY } from "./Allergy.js";

const S = {
  wrapGap: "clamp(30px,3.5vmin,90px)",   // 드롭다운 ↔ 체크박스 간격
  selectW: "min(170px, 70%)",            // 알레르기 드롭다운
  pillFS:  "clamp(11px,1.5vmin,13px)",
  chkFS:   "clamp(13px,1.6vmin,20px)",
  offsetX: "clamp(6px,2.5vw,120px)",      //전체 오른쪽으로
};

export default function AllergyPicker({
  has, category, items, onToggleHas, onSelectCategory, onToggleItem,
}) {
  const cat = ALLERGY.find(c => c.key === category) || null;

  return (
    <div
      className="space-y-[clamp(10px,2vmin,18px)]"
      style={{ marginLeft: S.offsetX }}   
    >
      {/* 알레르기 체크박스 */}
      <label className="flex items-center gap-[clamp(10px,1.6vmin,14px)]">
        <input
          type="checkbox"
          checked={has}
          onChange={(e) => onToggleHas(e.target.checked)}
          className="w-[18px] h-[18px] rounded-[5px] border-gray-400"
        />
        <span className="text-[#111827] text-[clamp(14px,1.8vmin,16px)]">
          알레르기가 있습니다
        </span>
      </label>

      {/* 카테고리 드롭다운 */}
      {has && (
        <div style={{ display: "grid", gap: S.wrapGap }}>
          <select
            value={category}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="px-3 py-2 rounded-[12px] border-2 border-[#6A7282] bg-white text-[clamp(13px,1.6vmin,16px)]"
            style={{ width: S.selectW }}
          >
            <option value="">카테고리 선택</option>
            {ALLERGY.map(c => (
              <option key={c.key} value={c.key}>{c.title}</option>
            ))}
          </select>

          {/* 항목 체크박스 그리드 */}
          {cat && (
            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
              style={{ columnGap: "clamp(10px,2vmin,18px)", rowGap: "clamp(8px,1.6vmin,14px)" }}
            >
              {cat.items.map((name) => {
                const id = `${cat.key}-${name}`;
                const checked = items?.includes(name);
                return (
                  <label key={id} htmlFor={id} className="inline-flex items-center gap-2">
                    <input
                      id={id}
                      type="checkbox"
                      checked={!!checked}
                      onChange={() => onToggleItem(name, !checked)}
                      className="w-[16px] h-[16px] rounded-[4px] border-gray-400"
                    />
                    <span className="text-[#374151]" style={{ fontSize: S.chkFS }}>
                      {name}
                    </span>
                  </label>
                );
              })}
            </div>
          )}

          {cat && items?.length > 0 && (
            <div className="text-[#6B7280]" style={{ fontSize: S.pillFS }}>
              선택됨 {items.length}개
            </div>
          )}
        </div>
      )}
    </div>
  );
}
