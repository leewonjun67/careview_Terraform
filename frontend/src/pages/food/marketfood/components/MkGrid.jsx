//편의점 조합 카드를 그리드로

import React from "react";
import MkCard from "./MkCard";

export default function MkGrid({ sets = [] }) {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[clamp(10px,2.2vmin,18px)]">
      {sets.map((s) => (
        <MkCard
          key={s.set_id}
          set={s}
        />
      ))}
    </section>
  );
}
