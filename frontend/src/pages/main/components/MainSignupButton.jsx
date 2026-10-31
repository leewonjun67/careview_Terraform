import React from "react";
import MainSign from "../../../assets/main/main_sign.svg";

const S = {
  width: "clamp(300px, 30vw, 800px)",
};

export default function MainSignupButton({ href = "/sign" }) {
  return (
    <a href={href} className="block drop-shadow-lg">
      <img
        src={MainSign}
        alt="회원가입"
        style={{ width: S.width }}
        className="h-auto"
        draggable="false"
      />
    </a>
  );
}
