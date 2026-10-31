import React, { useMemo } from "react";

function Sparkline({ series = [] }) {
  const WIDTH = 170;
  const HEIGHT = 20;

  const path = useMemo(() => {
    if (!series?.length) return "";

    const min = Math.min(...series);
    const max = Math.max(...series);
    const span = max - min || 1;

    const pts = series.map((v, i) => {
      const x = (i / (series.length - 1 || 1)) * WIDTH;
      const y = HEIGHT - ((v - min) / span) * HEIGHT;
      return `${x},${y}`;
    });

    return `M ${pts.join(" L ")}`;
  }, [series]);

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-[clamp(40px,16vmin,200px)]"
      aria-hidden="true"
    >
      {!series?.length ? (
        <path
          d={`M 0 ${HEIGHT / 2} L ${WIDTH} ${HEIGHT / 2}`}
          stroke="currentColor"
          opacity="0.2"
          strokeDasharray="4 4"
          fill="none"
        />
      ) : (
        <path
          d={path}
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          opacity="0.8"
        />
      )}
    </svg>
  );
}

export default function MetricCard({
  title,
  value,
  unit,
  series,
  hint,
  className = "",
}) {
  const valText =
    typeof value === "number" && !Number.isNaN(value)
      ? value.toFixed(1)
      : "—";

  return (
    <article
      className={`
        flex flex-col
        bg-white
        rounded-[clamp(10px,1.4vmin,14px)]
        shadow-xl
        ring-3 ring-black/7
        p-[clamp(14px,3vmin,30px)]
        min-h-[clamp(170px,42vmin,550px)]
        w-[clamp(200px,16vw,320px)]
        my-[clamp(20px,10vmin,80px)]
        ${className}
      `}
    >
      {/* 상단: 타이틀 + 값/단위 */}
      <div>
        <h3 className="text-[clamp(12px,1.7vmin,40px)] font-semibold text-[#364153E5]">
          {title}
        </h3>

        <div className="mt-[clamp(12px,1.8vmin,40px)] flex items-end gap-[8px]">
          <div className="text-[clamp(20px,4.5vmin,70px)] leading-none font-semibold">
            {valText}
          </div>
          {unit && (
            <div className="text-[clamp(8px,1.7vmin,20px)] font-semibold pb-[-2px]">
              {unit}
            </div>
          )}
        </div>
      </div>

      {/* 그래프: 텍스트 아래 */}
      <div className="mt-[clamp(12px,1.6vmin,14px)] font-extrabold">
        <Sparkline series={series} />
      </div>

      {/* 하단 힌트 */}
      {hint && (
        <div className="mt-auto pt-[clamp(4px,0.8vmin,8px)] text-[clamp(10px,1.2vmin,12px)] text-[#9CA3AF]">
          {hint}
        </div>
      )}
    </article>
  );
}
