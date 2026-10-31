import React from "react";

const timeOptions = (() => {
  const a = [];
  for (let m = 0; m <= 1440; m += 30) {
    const hh = String(Math.floor(m / 60)).padStart(2, "0");
    const mm = String(m % 60).padStart(2, "0");
    a.push(`${hh}:${mm}`);
  }
  return a;
})();

export default function Step2({ value, onChange }) {
  const days = [
    ["mon","월요일"],["tue","화요일"],["wed","수요일"],
    ["thu","목요일"],["fri","금요일"],["sat","토요일"],["sun","일요일"],
  ];

  const setRow = (k, patch) =>
    onChange({ ...value, [k]: { ...value[k], ...patch } });

  // 간격
  const GAP = {
    group:    "clamp(28px,5vmin,72px)",   // 시작 종료 그룹 간
    inner:    "clamp(6px,1.1vmin,12px)",  // 각 그룹 내부
    afterDay: "clamp(40px,7vmin,100px)", // 요일과 드롭다운
  };

  const Row = ({ k, label }) => {
    const r = value[k];
    const chkId   = `${k}-enabled`;
    const startId = `${k}-start`;
    const endId   = `${k}-end`;

    return (
      <div className="py-[clamp(10px,1.6vmin,14px)]">
        <div className="flex items-center gap-[clamp(12px,2vmin,16px)] flex-wrap">
          {/* 체크박스 + 요일 */}
          <input
            id={chkId}
            type="checkbox"
            checked={r.enabled}
            onChange={(e) =>
              setRow(k, {
                enabled: e.target.checked,
                ...(e.target.checked ? {} : { start: "", end: "" }),
              })
            }
            className="w-[18px] h-[18px] rounded-[5px] border-gray-400"
          />
          <label
            htmlFor={chkId}
            className="cursor-pointer min-w-[5.2em] text-[clamp(14px,1.8vmin,16px)] text-[#111827]"
          >
            {label}
          </label>

          {/* 시작/종료*/}
          {r.enabled && (
            <div
              className={`flex items-center max-[520px]:flex-wrap max-[520px]:ml-0`}
              style={{ gap: GAP.group, marginLeft: GAP.afterDay }}
            >
              {/* 시작 */}
              <div className="flex items-center" style={{ gap: GAP.inner }}>
                <label
                  htmlFor={startId}
                  className="text-[#6B7280] text-[clamp(13px,1.6vmin,15px)] cursor-pointer"
                >
                  시작
                </label>
                <select
                  id={startId}
                  aria-label="시작 시간"
                  value={r.start}
                  onChange={(e) => setRow(k, { start: e.target.value })}
                  className={[
                    "px-3 py-2 rounded-[12px] border border-[#E5E7EB] bg-white",
                    "text-[clamp(13px,1.6vmin,16px)]",
                    "w-[clamp(130px,24vw,200px)]",
                  ].join(" ")}
                >
                  <option value="" hidden />
                  {timeOptions.map((t) => (
                    <option key={`s-${k}-${t}`} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              {/* 종료 */}
              <div className="flex items-center" style={{ gap: GAP.inner }}>
                <label
                  htmlFor={endId}
                  className="text-[#6B7280] text-[clamp(13px,1.6vmin,15px)] cursor-pointer"
                >
                  종료
                </label>
                <select
                  id={endId}
                  aria-label="종료 시간"
                  value={r.end}
                  onChange={(e) => setRow(k, { end: e.target.value })}
                  className={[
                    "px-3 py-2 rounded-[12px] border border-[#E5E7EB] bg-white",
                    "text-[clamp(13px,1.6vmin,16px)]",
                    "w-[clamp(130px,24vw,200px)]",
                  ].join(" ")}
                >
                  <option value="" hidden />
                  {timeOptions.map((t) => (
                    <option key={`e-${k}-${t}`} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    // 오른쪽/아래 오프셋 유지
    <div
      className="
        w-full
        max-w-[720px]
        mx-auto
        mt-[clamp(30px,8vh,140px)]
        ml-[clamp(9px,2.8vw,70px)]
      "
    >
      {days.map(([k, label]) => (
        <Row key={k} k={k} label={label} />
      ))}
    </div>
  );
}
