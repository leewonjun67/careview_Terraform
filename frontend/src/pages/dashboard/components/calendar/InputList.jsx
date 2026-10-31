import React from "react";

export default function InputList({ items, onRemove }) {
  if (!items || items.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center text-center">
        <p className="text-[clamp(14px,2vmin,20px)] text-gray-400">
          일정을 추가해보세요.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3 flex flex-col items-center">
      {items.map((item) => {
        let labelLine = "";
        let body = "";

        if (typeof item.text === "string") {
          const [firstLine, ...rest] = item.text.split("\n");
          labelLine = firstLine || "";
          body = rest.join("\n").trim();
        } else if (item.text && typeof item.text === "object") {
          // 혹시 예전에 객체로 저장된 게 있다면 최소 방어
          labelLine = item.text.label || "";
          body = (item.text.content || "").trim();
        }

        let timeText = labelLine;
        let titleText = "";

        const dotIndex = labelLine.indexOf(". ");
        if (dotIndex !== -1) {
          timeText = labelLine.slice(0, dotIndex);          
          titleText = labelLine.slice(dotIndex + 2);        
        }

        return (
          <li
            key={item.id}
            className="
              w-[clamp(260px,70%,420px)]
              min-h-[clamp(80px,11vmin,140px)]
              border-2 border-[#009689]
              rounded-[clamp(10px,1.4vmin,16px)]
              bg-white
              px-4 py-3
              shadow-sm
              flex flex-col justify-center
            "
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                {/* 시간 */}
                {timeText && (
                  <p className="text-[clamp(12px,1.8vmin,16px)] text-gray ">
                    {timeText}
                  </p>
                )}

                {/* 초록 점 + 제목 */}
                {titleText && (
                  <div className="mt-1 flex items-start">
                    <span
                      className="
                        inline-block
                        w-[8px] h-[8px]
                        rounded-full
                        bg-[#009689]
                        mt-[6px]
                        mr-2
                      "
                    />
                    <span className="text-[clamp(14px,2vmin,20px)] font-semibold text-gray-800">
                      {titleText}
                    </span>
                  </div>
                )}

                {/* 내용 */}
                {body && (
                  <p className="mt-1 pl-4 text-[clamp(12px,1.7vmin,16px)] text-gray-600">
                    {body}
                  </p>
                )}
              </div>

              {/* 삭제 버튼 */}
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="text-[clamp(11px,1.5vmin,14px)] text-gray-500 hover:text-red-600"
                aria-label="삭제"
              >
                삭제
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
