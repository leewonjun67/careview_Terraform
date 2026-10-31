//기록실 메인 페이지

import React, { useEffect, useMemo, useState } from "react";
import DailyHeader from "../dailyfood/components/DailyHeader.jsx";
import Footer from "../../layout/footer/footer.jsx";

import RecordDayCard from "./components/card/RecordDayCard.jsx";
import WeeklySummary from "./components/WeeklySummary.jsx";
import RecodeSection from "./components/RecodeSection.jsx";
import { getRecordPage, saveRecordMetric } from "../../api/recode/recode.js";

const S = {
  weekGap:     "clamp(10px, 1.4vmin, 16px)",
  titleGap:    "clamp(6px, 2.5vmin, 30px)",
  weekCtrlGap: "clamp(10px, 1.4vmin, 14px)",
  titleFs:     "clamp(18px, 3.5vmin, 40px)",
  subFs:       "clamp(13px, 2.5vmin, 30px)",
};

const WEEK_LABEL = ["일", "월", "화", "수", "목", "금", "토"];

function toDate(dateStr) {
  return new Date(dateStr + "T00:00:00");
}

function addDays(dateStr, diff) {
  const d = toDate(dateStr);
  d.setDate(d.getDate() + diff);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getWeekTitle(startDate) {
  if (!startDate) return "";
  const d = toDate(startDate);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const weekOfMonth = Math.floor((d.getDate() - 1) / 7) + 1;

  return `${year}년 ${month}월 ${weekOfMonth}주차`;
}

export default function RecodePage() {
  const [weeklyRecords, setWeeklyRecords] = useState(null);
  const [weeklySummary, setWeeklySummary] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  // 선택된 날짜용 입력 값
  const [editingWeight, setEditingWeight] = useState("");
  const [editingSleep, setEditingSleep] = useState("");
  const [editingExercise, setEditingExercise] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [saving, setSaving] = useState(false);

  async function loadWeek(targetDate) {
    try {
      setLoading(true);
      setError("");
      const data = await getRecordPage(targetDate);
      const wr = data.weekly_records;
      const ws = data.weekly_summary;

      setWeeklyRecords(wr);
      setWeeklySummary(ws);

      if (targetDate) {
        const found = wr?.daily_records?.find((d) => d.date === targetDate);
        const metric = found?.metric || null;

        setSelectedDate(targetDate);
        setEditingWeight(metric?.weight_kg ?? "");
        setEditingSleep(metric?.sleep_duration_hours ?? "");
        setEditingExercise(metric?.exercise_duration_hours ?? "");
      } else {
        const firstWithMetric = wr?.daily_records?.find(
          (d) =>
            d.metric &&
            (d.metric.weight_kg != null ||
              d.metric.sleep_duration_hours != null ||
              d.metric.exercise_duration_hours != null)
        );

        const initialDate = firstWithMetric?.date || wr?.start_date || null;
        const metric = firstWithMetric?.metric || null;

        setSelectedDate(initialDate);
        setEditingWeight(metric?.weight_kg ?? "");
        setEditingSleep(metric?.sleep_duration_hours ?? "");
        setEditingExercise(metric?.exercise_duration_hours ?? "");
      }
    } catch (e) {
      console.error(e);
      if (e?.response?.status === 401) {
        setError("로그인이 필요한 기능입니다. 다시 로그인해 주세요.");
      } else {
        setError("기록 정보를 불러오는 중 오류가 발생했어요.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadWeek(undefined);
  }, []);

  const weekTitle = useMemo(
    () => getWeekTitle(weeklyRecords?.start_date),
    [weeklyRecords?.start_date]
  );

  const days = weeklyRecords?.daily_records || [];

  const handlePrevWeek = () => {
    if (!weeklyRecords?.start_date) return;
    const prev = addDays(weeklyRecords.start_date, -1);
    loadWeek(prev);
  };

  const handleNextWeek = () => {
    if (!weeklyRecords?.end_date) return;
    const next = addDays(weeklyRecords.end_date, 1);
    loadWeek(next);
  };

  // 카드 클릭 시 선택 날짜 + 입력 값 세팅
  const handleSelectDay = (dateStr) => {
    setSelectedDate(dateStr);
    const found = days.find((d) => d.date === dateStr);
    const metric = found?.metric || null;

    setEditingWeight(metric?.weight_kg ?? "");
    setEditingSleep(metric?.sleep_duration_hours ?? "");
    setEditingExercise(metric?.exercise_duration_hours ?? "");
  };

  // 카드 내부 작은 "저장" 버튼에서 호출
  const handleSave = async () => {
    if (!selectedDate) return;
    try {
      setSaving(true);

      const payload = {
        date: selectedDate,
        weight_kg: editingWeight ? Number(editingWeight) : 0,
        sleep_duration_hours: editingSleep ? Number(editingSleep) : 0,
        exercise_duration_hours: editingExercise
          ? Number(editingExercise)
          : 0,
      };

      await saveRecordMetric(payload);
      await loadWeek(selectedDate);
    } catch (e) {
      console.error(e);
      // 필요하면 토스트나 오류 메시지 추가
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-dvh bg-white flex flex-col">
      <div className="flex-1 flex justify-center px-[clamp(16px,4vw,40px)]">
        <div className="w-full max-w-[1440px] py-[clamp(24px,4vh,40px)] space-y-[clamp(24px,4vh,36px)]">
          <DailyHeader />

          <main className="space-y-[clamp(24px,3vh,32px)]">
            {/* 상단 타이틀 + 주간 네비게이션 */}
            <section className="flex flex-col items-center text-center">
              <div
                className="flex flex-col items-center"
                style={{ gap: S.titleGap }}
              >
                <h1
                  className="font-semibold text-[#111827]"
                  style={{ fontSize: S.titleFs }}
                >
                  건강 기록실
                </h1>
                <p
                  className="text-[#6B7280] mb-4"
                  style={{ fontSize: S.subFs }}
                >
                  나의 건강 여정을 기록하고 분석해요
                </p>
              </div>

              <div
                className="mt-[clamp(16px,2.2vmin,20px)] flex items-center text-[#6B7280] mb-4"
                style={{ gap: S.weekCtrlGap, fontSize: S.subFs }}
              >
                <button
                  type="button"
                  onClick={handlePrevWeek}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors"
                >
                  ‹
                </button>

                <div className="flex items-center gap-2">
                  <span className="text-[#111827]">{weekTitle}</span>
                </div>

                <button
                  type="button"
                  onClick={handleNextWeek}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] hover:bg-[#F3F4F6] transition-colors"
                >
                  ›
                </button>
              </div>
            </section>

            {/* 주간 카드 영역 */}
            <section>
              {loading ? (
                <div className="flex min-h-[120px] items-center justify-center text-[#9CA3AF] text-sm">
                  불러오는 중...
                </div>
              ) : error ? (
                <div className="flex min-h-[120px] items-center justify-center text-sm text-red-500">
                  {error}
                </div>
              ) : (
                <div className="overflow-x-auto pb-[clamp(8px,1vmin,12px)]">
                  <div
                    className="grid min-w-[720px] grid-cols-7 lg:min-w-0"
                    style={{ gap: S.weekGap }}
                  >
                    {days.map((d, idx) => {
                      const dateStr = d.date;
                      const day = toDate(dateStr);
                      const weekday = WEEK_LABEL[day.getDay()];

                      const hasMetric =
                        d.metric &&
                        (d.metric.weight_kg != null ||
                          d.metric.sleep_duration_hours != null ||
                          d.metric.exercise_duration_hours != null);

                      const isSelected = selectedDate === dateStr;
                      const editing = isSelected && !hasMetric;

                      return (
                        <RecordDayCard
                          key={dateStr || idx}
                          date={dateStr}
                          metric={d.metric}
                          weekdayLabel={weekday}
                          isSelected={isSelected}
                          onClick={() => handleSelectDay(dateStr)}
                          editing={editing}
                          weight={editing ? editingWeight : ""}
                          sleep={editing ? editingSleep : ""}
                          exercise={editing ? editingExercise : ""}
                          onChangeWeight={setEditingWeight}
                          onChangeSleep={setEditingSleep}
                          onChangeExercise={setEditingExercise}
                          onSave={handleSave}
                          saving={saving}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* 이번 주 요약 카드 & 아래 섹션 */}
            <WeeklySummary summary={weeklySummary} />
            <RecodeSection />
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
