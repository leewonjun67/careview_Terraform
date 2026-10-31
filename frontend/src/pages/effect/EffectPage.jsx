//기록실 페이지 전체
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, withAuth, getErrorMessage, getAuthHeader } from "../../api/client";
import logo from "../../assets/dailyfood/df2.svg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const S = {
  wrapPx: "clamp(16px,4vw,40px)",
  wrapPy: "clamp(24px,5vmin,48px)",
  sectionGap: "clamp(24px,5vmin,40px)",
  cardGap: "clamp(12px,2.2vmin,22px)",
  cardPx: "clamp(20px,3vmin,28px)",
  cardPy: "clamp(18px,2.8vmin,24px)",
  cardRadius: "24px",
  titleFs: "clamp(18px,2.2vmin,24px)",
  subFs: "clamp(12px,1.5vmin,14px)",
  statLabelFs: "clamp(13px,1.6vmin,15px)",
  statValueFs: "clamp(22px,2.7vmin,26px)",
  statSubFs: "clamp(11px,1.4vmin,13px)",
  chartTitleFs: "clamp(14px,1.8vmin,18px)",
  chartHeight: 260,
  logoW: "clamp(32px,5vmin,52px)", // 로고 너비
};

function formatNumber(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(value)) return "-";
  const num = Number(value);
  if (!Number.isFinite(num)) return "-";
  return num.toLocaleString("ko-KR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

function StatCard({ label, value, unit, sub, iconLabel = "A" }) {
  return (
    <div
      className="bg-white border border-[#E5E7EB] rounded-[24px] flex flex-col"
      style={{ padding: `${S.cardPy} ${S.cardPx}` }}
    >
      <div className="flex items-center gap-[10px] mb-[clamp(10px,1.8vmin,14px)]">
        <div className="w-[32px] h-[32px] rounded-xl bg-[#00B894] flex items-center justify-center text-white text-xs font-semibold">
          {iconLabel}
        </div>
        <div className="text-[#6B7280] text-[13px]">예상 변화</div>
      </div>

      <div className="text-[#111827] text-[clamp(14px,1.8vmin,16px)] font-medium mb-[4px]">
        {label}
      </div>

      <div className="flex items-baseline gap-[6px] mb-[6px]">
        <div className="font-semibold text-[#111827]" style={{ fontSize: S.statValueFs }}>
          {value}
        </div>
        {unit && (
          <div className="text-[#6B7280] text-[clamp(13px,1.6vmin,15px)]">{unit}</div>
        )}
      </div>

      {sub && (
        <div className="text-[#9CA3AF]" style={{ fontSize: S.statSubFs }}>
          {sub}
        </div>
      )}
    </div>
  );
}

function ExpectedChart({ title, subtitle, unit, data }) {
  return (
    <div
      className="bg-white border border-[#E5E7EB] rounded-[24px]"
      style={{ padding: `${S.cardPy} ${S.cardPx}` }}
    >
      <div className="mb-[clamp(10px,1.6vmin,14px)]">
        <div className="text-[#111827] font-medium" style={{ fontSize: S.chartTitleFs }}>
          {title}
        </div>
        <div className="text-[#9CA3AF] text-[12px] mt-[4px]">{subtitle}</div>
      </div>

      <div style={{ width: "100%", height: S.chartHeight }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 10, right: 16, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6B7280" }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(v) => `${v}${unit || ""}`}
            />
            <Tooltip
              formatter={(value) => [`${value}${unit || ""}`, title]}
              labelFormatter={(label) => label}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#00B894"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function EffectPage() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchData() {
      // 1) 먼저 토큰이 있는지 확인
      const auth = getAuthHeader();
      if (!auth.Authorization) {
        setLoading(false);
        setErrorMsg("로그인 후 이용 가능한 서비스입니다.");
        // 필요하면 여기서 로그인 페이지로 이동
        // navigate("/login");
        return;
      }

      try {
        setLoading(true);
        setErrorMsg("");

        // 2) 토큰을 붙여서 요청
        const res = await api.get("/api/expected-effect", withAuth());

        if (cancelled) return;
        setData(res.data);
      } catch (error) {
        console.error("ExpectedEffect error", error);

        if (!cancelled) {
          const msg = getErrorMessage(
            error,
            "기대 효과 정보를 불러오지 못했어요. 잠시 후 다시 시도해 주세요."
          );
          setErrorMsg(msg);

          // 401이면 로그인 문제일 가능성이 높음
          if (error?.response?.status === 401) {
            // 필요하면 자동으로 로그인 페이지로 이동
            // navigate("/login");
          }
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    return () => {
      cancelled = true;
    };
  }, []);

  const prepared = useMemo(() => {
    if (!data) return null;

    const {
      current_weight,
      current_bmi,
      total_exercise_minutes,
      weekly_predictions = [],
    } = data;

    // 주차 순으로 정렬
    const sorted = [...weekly_predictions].sort((a, b) => a.week - b.week);

    const last = sorted[sorted.length - 1] || {};

    // 백엔드 오타(predicted_weght) 대비
    const lastWeight =
      last.predicted_weight ??
      last.predicted_weght ??
      current_weight ??
      null;
    const lastBmi = last.predicted_bmi ?? current_bmi ?? null;

    // 그래프용 데이터 (현재 + 1~4주)
    const weightSeries = [
      { label: "현재", value: Number(current_weight ?? 0) },
      ...sorted.map((w) => ({
        label: `${w.week}주`,
        value: Number(w.predicted_weight ?? w.predicted_weght ?? current_weight ?? 0),
      })),
    ];

    const bmiSeries = [
      { label: "현재", value: Number(current_bmi ?? 0) },
      ...sorted.map((w) => ({
        label: `${w.week}주`,
        value: Number(w.predicted_bmi ?? current_bmi ?? 0),
      })),
    ];

    return {
      predictedWeight: lastWeight,
      predictedBmi: lastBmi,
      currentWeight: current_weight,
      currentBmi: current_bmi,
      totalMinutes: total_exercise_minutes,
      weightSeries,
      bmiSeries,
    };
  }, [data]);

  return (
    <div className="min-h-dvh bg-[#F9FAFB] flex justify-center">
      <div
        className="w-full max-w-[1440px]"
        style={{ padding: `${S.wrapPy} ${S.wrapPx}` }}
      >
        {/* 상단 헤더 */}
        <div className="flex flex-col gap-[clamp(8px,1.5vmin,12px)] mb-[clamp(20px,4vmin,32px)]">
          <div className="flex items-center gap-[clamp(8px,1.5vmin,12px)]">
            {/* df2.svg 로고 */}
            <img
              src={logo}
              alt="Care View 로고"
              style={{ width: S.logoW, height: "auto" }}
            />
            <div className="text-[#111827] font-semibold text-[clamp(14px,1.8vmin,16px)]">
              Care View
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-[6px] mt-[4px] w-fit rounded-full border border-[#E5E7EB] bg-white px-[14px] py-[6px] text-[13px] text-[#374151] hover:bg-[#F3F4F6] transition-colors"
          >
            <span className="text-[16px]">←</span>
            <span>돌아가기</span>
          </button>
        </div>

        {/* 중앙 타이틀 */}
        <div className="flex flex-col items-center text-center mb-[clamp(24px,4.5vmin,40px)]">
          <div className="font-semibold text-[#111827]" style={{ fontSize: S.titleFs }}>
            4주 후 예상되는 변화
          </div>
          <div
            className="mt-[6px] text-[#6B7280]"
            style={{ fontSize: S.subFs }}
          >
            체중, BMI, 운동시간 데이터를 기반으로 한 예측입니다.
          </div>
        </div>

        {/* 로딩 / 에러 */}
        {loading && (
          <div className="text-center text-[#6B7280] mt-[40px]">
            기대 효과를 계산하는 중입니다...
          </div>
        )}

        {!loading && errorMsg && (
          <div className="text-center text-[#EF4444] mt-[40px]">
            {errorMsg}
          </div>
        )}

        {!loading && !errorMsg && prepared && (
          <div className="space-y-[clamp(24px,5vmin,40px)]">
            {/* 상단 3개 카드 */}
            <div
              className="grid grid-cols-1 md:grid-cols-3"
              style={{ gap: S.cardGap }}
            >
              <StatCard
                iconLabel="W"
                label="예상 체중 변화"
                value={formatNumber(prepared.predictedWeight, 1)}
                unit="kg"
                sub={
                  prepared.currentWeight != null
                    ? `현재: ${formatNumber(prepared.currentWeight, 1)} kg`
                    : null
                }
              />

              <StatCard
                iconLabel="B"
                label="BMI 개선"
                value={formatNumber(prepared.predictedBmi, 1)}
                unit=""
                sub={
                  prepared.currentBmi != null
                    ? `현재: ${formatNumber(prepared.currentBmi, 1)}`
                    : null
                }
              />

              <StatCard
                iconLabel="T"
                label="총 운동시간"
                value={
                  prepared.totalMinutes != null
                    ? formatNumber(prepared.totalMinutes, 0)
                    : "-"
                }
                unit="분"
                sub="4주 기준 예상 누적 운동시간"
              />
            </div>

            {/* 하단 그래프 2개 */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2"
              style={{ gap: S.cardGap }}
            >
              <ExpectedChart
                title="체중 변화 예측"
                subtitle="4주간 예상 추이 (kg)"
                unit="kg"
                data={prepared.weightSeries}
              />
              <ExpectedChart
                title="BMI 변화 예측"
                subtitle="4주간 예상 추이"
                unit=""
                data={prepared.bmiSeries}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
