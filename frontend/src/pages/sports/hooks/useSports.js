import { useState, useEffect, useCallback } from "react";
import { api, withAuth, getErrorMessage } from "../../../api/client";
import {
  getTotalDuration,
  getTotalCalorie,
} from "../utils/sportsTotals";

export default function useSports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const loadExercises = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const res = await api.get(
        "/api/exercise/recommend",
        withAuth()
      );

      setData(res.data);
    } catch (err) {
      setErrorMsg(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // 첫 진입 시 한 번 호출
    loadExercises();
  }, [loadExercises]);

  const morning = data?.morning ?? null;
  const lunch = data?.lunch ?? null;
  const dinner = data?.dinner ?? null;

  return {
    loading,
    errorMsg,
    reload: loadExercises,
    morning,
    lunch,
    dinner,
    totalDuration: getTotalDuration(data),
    totalCalorie: getTotalCalorie(data),
  };
}
