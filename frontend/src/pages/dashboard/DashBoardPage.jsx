import React from "react";
import Footer from "../../layout/footer/footer.jsx";
import DashBanner from "./components/banner/DashBanner.jsx";
import MetricsRow from "./components/card/MetricsRow.jsx";
import Calendar from "./components/calendar/Calendar.jsx";
import QuickLinks from "./components/QuickLinks.jsx";
import Header from "../../layout/header/Header.jsx";
import useRecordMetrics from "./hooks/useRecordMetrics.js"; // ✅ 추가

export default function DashBoardPage() {
  const {
    latestWeight,
    latestSleep,
    latestExercise,
    weightSeries,
    sleepSeries,
    exerciseSeries,
  } = useRecordMetrics();

  return (
    <div style={{ backgroundColor: "#F8F9FB" }}>
      <Header />
      <DashBanner />

      <MetricsRow
        weightSeries={weightSeries}
        exerciseSeries={exerciseSeries}
        sleepSeries={sleepSeries}
        latestWeight={latestWeight}
        latestSleep={latestSleep}
        latestExercise={latestExercise}
      />

      <Calendar />
      <QuickLinks />
      <Footer />
    </div>
  );
}
