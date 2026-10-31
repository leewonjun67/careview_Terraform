import React, { useEffect, useState } from "react";
import MkTipCard from "./components/MkTipCard";
import MkGrid from "./components/MkGrid";
import MkGuideCard from "./components/MkGuideCard";
import { fetchConvenienceSets } from "../../../api/meal/meals";

export default function MarketFoodPage() {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchConvenienceSets();
        if (cancelled) return;

        setSets(Array.isArray(data) ? data : []);
      } catch (err) {
        if (cancelled) return;
        console.error(err);
        setError("편의점 식단을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.");
        setSets([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-[clamp(14px,3vmin,24px)]">
      <MkTipCard />

      {loading && (
        <div className="bg-white/70 border border-[#E5E7EB] rounded-2xl p-[clamp(14px,2vmin,18px)] text-[#6B7280] text-[clamp(12px,1.5vmin,14px)]">
          편의점 식단을 불러오는 중입니다…
        </div>
      )}

      {error && !loading && (
        <div className="bg-white/70 border border-[#FCA5A5] rounded-2xl p-[clamp(14px,2vmin,18px)] text-[#DC2626] text-[clamp(12px,1.5vmin,14px)]">
          {error}
        </div>
      )}

      {!loading && !error && <MkGrid sets={sets} />}

      <MkGuideCard />
    </div>
  );
}
