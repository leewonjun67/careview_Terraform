import React from "react";
import MainDash from "../../../assets/main/main3.svg";

const S = {
  width: "clamp(300px, 30vw, 800px)",
};

export default function MainStartButton({ href = "/dashboard" }) {
  return (
    <a href={href} className="block drop-shadow-lg">
      <img
        src={MainDash}
        alt="대시보드로 이동"
        className="h-auto"
        draggable="false"
      />
    </a>
  );
}
