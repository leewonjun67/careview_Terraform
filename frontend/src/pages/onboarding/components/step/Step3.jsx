import React from "react";
import AllergyPicker from "../allergy/AllergyPicker";

export default function Step3({ value, onChange }) {
  const set = (patch) => onChange({ ...value, ...patch });
  const allergy = value?.allergy ?? { has: false, category: "", items: [] };

  const S = {
    //나이신장체중
    fieldsML: "clamp(8px,2.4vw,50px)",      //오른쪽으로
    fieldsMT: "clamp(30px,6.0vh,80px)",     //아래로
    fieldsGap: "clamp(12px,2vmin,18px)",    // 칸 사이 간격
    //입력 필드
    inputW: "clamp(100px,16vw,220px)",      //가로
    inputPY: "clamp(8px,1.4vmin,12px)",     //세로
    inputFS: "clamp(12px,1.8vmin,16px)",    //폰트 크기
    // 라벨 폰트 & 간격
    labelFS: "clamp(14px,1.8vmin,20px)",
    labelMB: "clamp(16px,2.8vmin,40px)",
    // 구분선
    dividerMT: "clamp(24px,6vh,80px)",      //위
    dividerPT: "clamp(24px,6vmin,80px)",    //아래
  };

  const input = (k, ph) => (
    <input
      type="number"
      min="0"
      placeholder={ph}
      value={value[k] ?? ""}
      onChange={(e) => set({ [k]: e.target.value })}
      className="rounded-[12px] border-2 border-[#6A7282] bg-white"
      style={{
        width: S.inputW,
        paddingBlock: S.inputPY,
        paddingInline: "clamp(10px,2vmin,14px)",
        fontSize: S.inputFS,
      }}
    />
  );

  return (
    <div>
      {/* 3개 필드 */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 place-items-start"
        style={{ gap: S.fieldsGap, marginLeft: S.fieldsML, marginTop: S.fieldsMT }}
      >
        <div>
          <div className="text-[#364153]" style={{ fontSize: S.labelFS, marginBottom: S.labelMB }}>
            나이 (만)
          </div>
          {input("age", "25세",)}
        </div>

        <div>
          <div className="text-[#364153]" style={{ fontSize: S.labelFS, marginBottom: S.labelMB }}>
            신장 (cm)
          </div>
          {input("heightCm", "170cm")}
        </div>

        <div>
          <div className="text-[#364153]" style={{ fontSize: S.labelFS, marginBottom: S.labelMB }}>
            체중 (kg)
          </div>
          {input("weightKg", "65kg")}
        </div>
      </div>

      {/* 구분선 + 알레르기 영역 */}
      <div className="border-t-3 border-[#F3F4F6]" style={{ marginTop: S.dividerMT, paddingTop: S.dividerPT }}>
        <AllergyPicker
          has={allergy.has}
          category={allergy.category}
          items={allergy.items}
          onToggleHas={(next) =>
            set({ allergy: { has: next, category: next ? allergy.category : "", items: next ? allergy.items : [] } })
          }
          onSelectCategory={(key) =>
            set({ allergy: { ...allergy, category: key, items: [] } })
          }
          onToggleItem={(name, add) => {
            const next = new Set(allergy.items);
            add ? next.add(name) : next.delete(name);
            set({ allergy: { ...allergy, items: Array.from(next) } });
          }}
        />
      </div>
    </div>
  );
}
