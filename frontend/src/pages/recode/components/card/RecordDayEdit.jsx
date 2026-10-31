//기록을 입력하고 저장 UI

import React from "react";
import { S, METRIC_CONFIG } from "./style/recordDayStyles";
import RecordInput from "./RecordInput";

export default function RecordDayEdit({
  weight,
  sleep,
  exercise,
  onChangeWeight,
  onChangeSleep,
  onChangeExercise,
  saving,
  onSave,
}) {
  // 각 필드별로 value / onChange / min / step / placeholder 정의
  const bindings = {
    weight: {
      value: weight,
      onChange: onChangeWeight,
      min: 0,
      step: 0.1,
      placeholder: "예: 65.5",
    },
    sleep: {
      value: sleep,
      onChange: onChangeSleep,
      min: 0,
      step: 0.5,
      placeholder: "예: 7.5",
    },
    exercise: {
      value: exercise,
      onChange: onChangeExercise,
      min: 0,
      step: 0.5,
      placeholder: "예: 1.0",
    },
  };

  return (
    <div className="space-y-[clamp(8px,1.5vmin,14px)]">
      {METRIC_CONFIG.map((cfg) => {
        const bind = bindings[cfg.key]; //여기서 bind는 '객체'

        if (!bind) return null;

        return (
          <RecordInput
            key={cfg.key}
            label={cfg.label}
            value={bind.value ?? ""}       
            onChange={bind.onChange}      
            unit={cfg.unit}
            pillPy={S.pillPy}
            pillPx={S.pillPx}
            labelFs={S.inputLabelFs}
            valueFs={S.inputValueFs}
            min={bind.min}
            step={bind.step}
            placeholder={bind.placeholder}
          />
        );
      })}

      <div className="flex justify-end pt-[clamp(4px,1vmin,8px)]">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSave?.();
          }}
          disabled={saving}
          className="rounded-full border border-[#009689] text-[#009689] 
                     px-[clamp(14px,2vmin,20px)]
                     py-[clamp(6px,1.2vmin,10px)]
                     text-[clamp(12px,1.5vmin,14px)]
                     font-medium
                     bg-white hover:bg-[#009689]/5
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-colors"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </div>
  );
}
