import React from "react";
import MainLogin from "../../../assets/main/main_login.svg";

const S = {
  width: "clamp(300px, 30vw, 800px)",
};

export default function MainLoginButton({ href = "/login" }) {
  return (
    <a href={href} className="block drop-shadow-lg">
      <img
        src={MainLogin}
        alt="로그인"
        style={{ width: S.width }}
        className="h-auto"
        draggable="false"
      />
    </a>
  );
}
