import { useEffect, useState, useCallback } from "react";
import { fmt } from "../utils/dateUtils";

const STORAGE_KEY = "cv-dash-tasks"; 
// 구조: { "YYYY-MM-DD": [{ id, text, done }] }

function loadInitialTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // 혹시 구조 깨져있을 때 대비
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function useCalendar() {
  // 최초 한 번만 localStorage 읽도록 lazy init
  const [tasks, setTasks] = useState(loadInitialTasks);

  // 변경될 때마다 저장
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      // 저장 실패해도 앱 죽지 않게 무시
    }
  }, [tasks]);

  const addTask = useCallback((dateKey, text) => {
    if (!text.trim()) return;
    const id = Math.random().toString(36).slice(2, 9);
    setTasks((prev) => ({
      ...prev,
      [dateKey]: [...(prev[dateKey] || []), { id, text, done: false }],
    }));
  }, []);

  const toggleTask = useCallback((dateKey, id) => {
    setTasks((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).map((t) =>
        t.id === id ? { ...t, done: !t.done } : t
      ),
    }));
  }, []);

  const removeTask = useCallback((dateKey, id) => {
    setTasks((prev) => ({
      ...prev,
      [dateKey]: (prev[dateKey] || []).filter((t) => t.id !== id),
    }));
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    removeTask,
  };
}
