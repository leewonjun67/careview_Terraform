// 3번째 섹션
import React from "react";
import { Link } from "react-router-dom";
import encourageIcon from "../../../assets/recode/re2.svg";

const S = {
  sectionMy: "clamp(40px, 10vmin, 80px)", // 섹션 상하 여백
  boxPy:   "clamp(24px, 4vmin, 40px)",    // 박스 패딩
  boxPx:   "clamp(20px, 4vmin, 40px)",
  boxMinH: "clamp(140px, 50vmin, 400px)",
  contentOffset: "clamp(4px, 2vmin, 20px)", // 내용 전체를 살짝 아래로 내리기
  iconSize: "clamp(40px, 8vmin, 60px)",
  titleFs: "clamp(14px, 2.3vmin, 24px)",  // 문구
  descFs:  "clamp(13px, 1.5vmin, 14px)",
  // 버튼
  btnPy:   "clamp(7px, 1.2vmin, 9px)",
  btnPx:   "clamp(18px, 3vmin, 26px)",
  btnFs:   "clamp(13px, 1.5vmin, 15px)",
  btnMt:   "clamp(14px, 14vmin, 80px)",   // 버튼 위 간격
};

export default function RecodeSection() {
  return (
    <section
      className="flex justify-center"
      style={{
        marginTop: S.sectionMy,
        marginBottom: S.sectionMy,
      }}
    >
      <div
        className="w-full rounded-2xl bg-[#F9FAFB] border border-[#D1D5DC] text-center flex flex-col items-center"
        style={{
          padding: `${S.boxPy} ${S.boxPx}`,
          rowGap: "clamp(10px, 2vmin, 18px)",
          minHeight: S.boxMinH,
        }}
      >
        <img
          src={encourageIcon}
          alt=""
          style={{
            width: S.iconSize,
            height: "auto",
            marginTop: S.contentOffset,
          }}
        />

        <p
          className="text-[#111827]"
          style={{ fontSize: S.titleFs }}
        >
          훌륭해요! 꾸준히 기록하고 있어요
        </p>

        {/* SPA 방식 이동 */}
        <Link
          to="/effect"
          className="inline-flex items-center justify-center border border-[#009689] bg-white text-[#009689] hover:bg-[#009689] hover:text-white transition-colors"
          style={{
            padding: `${S.btnPy} ${S.btnPx}`,
            fontSize: S.btnFs,
            marginTop: S.btnMt,
          }}
        >
          자세한 분석 보기
        </Link>
      </div>
    </section>
  );
}
