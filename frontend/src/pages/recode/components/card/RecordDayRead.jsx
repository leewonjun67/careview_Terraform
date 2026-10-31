//기록이 있는 카드

import React from "react";
import { S, METRIC_CONFIG } from "./style/recordDayStyles";
import RecordPill from "./RecordPill";

export default function RecordDayRead({ metric }) {
  return (
    <div className="flex flex-col" style={{ gap: S.cardGap }}>
      {METRIC_CONFIG.map((cfg) => (
        <RecordPill
          key={cfg.key}
          label={cfg.label}
          value={cfg.display(metric)}
          pillPy={S.pillPy}
          pillPx={S.pillPx}
          pillFs={S.pillFs}
          labelFs={S.readLabelFs} 
          valueFs={S.readValueFs} 
        />
      ))}
    </div>
  );
}
