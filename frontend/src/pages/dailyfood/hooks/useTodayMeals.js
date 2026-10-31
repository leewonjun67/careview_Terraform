// 오늘의 식단 + 합계 계산 + 식단 변경 훅 (API 버전)

import { useState, useCallback, useEffect } from "react";
import { api, withAuth, getErrorMessage } from "../../../api/client";

export const TARGET_CALORIES = 2000;

export function useTodayMeals() {
  const [meals, setMeals] = useState([]);      
  const [totals, setTotals] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(
        "/api/meals/recommendations/main",
        withAuth()
      );

      const data = res.data || {};

      const breakfast = data.breakfast || null;
      const lunch = data.lunch || null;
      const dinner = data.dinner || null;

      //백엔드 객체를 그대로 배열로 모음
      const nextMeals = [breakfast, lunch, dinner].filter(Boolean);
      setMeals(nextMeals);

      if (data.totals) {
        setTotals(data.totals);
      } else {
        // 혹시 totals가 안 내려오면 nutrition 기준으로 안전하게 합계 계산
        const totalsFromMeals = nextMeals.reduce(
          (acc, meal) => {
            const n = meal?.nutrition || {};
            return {
              calories: acc.calories + (n.calories ?? 0),
              carbohydrates:
                acc.carbohydrates + (n.carbohydrates ?? 0),
              protein: acc.protein + (n.protein ?? 0),
              fat: acc.fat + (n.fat ?? 0),
            };
          },
          { calories: 0, carbohydrates: 0, protein: 0, fat: 0 }
        );
        setTotals(totalsFromMeals);
      }
    } catch (err) {
      console.error(err);
      setError(getErrorMessage(err));
      setMeals([]);
      setTotals(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  //지금 API는 세 끼를 한 번에 내려주니까 type은 일단 무시하고 전체를 다시 불러옴.
  const refreshMeal = useCallback(
    (/* mealType */) => {
      fetchRecommendations();
    },
    [fetchRecommendations]
  );

  return {
    meals,     
    totals,  
    refreshMeal,
    loading,
    error,
  };
}
