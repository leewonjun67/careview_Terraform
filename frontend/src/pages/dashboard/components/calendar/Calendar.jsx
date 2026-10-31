import React, { useMemo, useState } from "react";
import { fmt, startOfMonth, buildMonthGrid } from "../../utils/dateUtils";
import { useCalendar } from "../../hooks/useCalendar";
import CalendarLeft from "./CalendarLeft";
import CalendarRight from "./CalendarRight";

export default function Calendar() {
  // 월 이동용 커서 & 선택된 날짜
  const [cursor, setCursor] = useState(startOfMonth(new Date()));
  const [selected, setSelected] = useState(new Date());

  // 전역(로컬) 일정 상태
  const { tasks, addTask, toggleTask, removeTask } = useCalendar();

  // 현재 cursor 기준 달력 그리드
  const days = useMemo(() => buildMonthGrid(cursor), [cursor]);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-[clamp(12px,2vmin,20px)]">
      <CalendarLeft
        cursor={cursor}
        setCursor={setCursor}
        selected={selected}
        setSelected={setSelected}
        days={days}
        tasks={tasks}
      />
      <CalendarRight
        selected={selected}
        tasks={tasks}
        addTask={addTask}
        toggleTask={toggleTask}
        removeTask={removeTask}
      />
    </section>
  );
}
