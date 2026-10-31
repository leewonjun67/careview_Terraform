//최종 본체 카드

import React from "react";
import { getDayOfMonth, hasMetricData } from "../../utils/recordDateUtils";
import { S } from "./style/recordDayStyles";
import RecordDayHeader from "./RecordDayHeader";
import RecordDayRead from "./RecordDayRead";
import RecordDayEmpty from "./RecordDayEmpty";
import RecordDayEdit from "./RecordDayEdit";

export default function RecordDayCard({
  date,
  metric,
  weekdayLabel,
  isSelected,
  onClick,
  editing = false,
  weight,
  sleep,
  exercise,
  onChangeWeight,
  onChangeSleep,
  onChangeExercise,
  onSave,
  saving = false,
}) {
  const day = getDayOfMonth(date);
  const hasMetric = hasMetricData(metric);

  const handleCardClick = () => {
    onClick?.();
  };

  return (
    <div
      onClick={handleCardClick}
      className={`relative flex flex-col justify-between rounded-2xl border bg-white transition-colors duration-150 text-left cursor-pointer
      ${
        isSelected
          ? "border-[#009689CC] shadow-[0_8px_20px_rgba(15,23,42,0.08)]"
          : "border-[#D1D5DC]"
      }`}
      style={{ padding: S.pillPx, gap: S.cardGap }}
    >
      <RecordDayHeader weekdayLabel={weekdayLabel} day={day} />

      {hasMetric && !editing && <RecordDayRead metric={metric} />}

      {!hasMetric && !editing && <RecordDayEmpty />}

      {!hasMetric && editing && (
        <RecordDayEdit
          weight={weight}
          sleep={sleep}
          exercise={exercise}
          onChangeWeight={onChangeWeight}
          onChangeSleep={onChangeSleep}
          onChangeExercise={onChangeExercise}
          saving={saving}
          onSave={onSave}
        />
      )}
    </div>
  );
}
