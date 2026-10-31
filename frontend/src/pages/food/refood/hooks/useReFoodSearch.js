// 예: src/pages/food/refood/hooks/useReFoodSearch.js
import { useState } from "react";
import { fetchMealsByIngredients } from "../../../../api/meal/meals";
import { getErrorMessage } from "../../../../api/client";

function normalize(s) {
  return (s ?? "").toString().trim().toLowerCase();
}

export default function useReFoodSearch() {
  const [items, setItems] = useState([]);     // 사용자가 입력한 재료 목록
  const [results, setResults] = useState([]); // 백엔드 응답 그대로
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addItem = (value) => {
    const v = normalize(value);
    if (!v) return;
    // 중복 방지
    if (items.some((it) => normalize(it) === v)) return;
    setItems((prev) => [...prev, value]);
  };

  const removeItem = (value) => {
    const v = normalize(value);
    setItems((prev) => prev.filter((it) => normalize(it) !== v));
  };

  const search = async () => {
    const cleaned = items.map(normalize).filter(Boolean);
    setSearched(true);
    setError(null);

    // 재료가 하나도 없으면 그냥 빈 결과
    if (!cleaned.length) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      //API 호출
      const apiMeals = await fetchMealsByIngredients(cleaned);

      setResults(apiMeals);
    } catch (err) {
      console.error(err);
      setError(
        getErrorMessage(
          err,
          "추천 식단을 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
        )
      );
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return { //백엔드 타입으로 변경함
    items,
    results,  
    searched,
    loading,
    error,
    addItem,
    removeItem,
    search,
  };
}
