import React from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "./LoginHeader";
import LoginFormCard from "./LoginFormCard";
import LoginFooterText from "./LoginFooterText";
import {
  LOGIN_VERTICAL_PADDING as VPAD,
  LOGIN_BOTTOM_PADDING as BOTPAD,
} from "../constants/loginLayout";

export default function LoginLeft() {
  const navigate = useNavigate();

  return (
    <aside
      className="w-full min-h-dvh lg:min-h-dvh lg:box-border flex items-start justify-center bg-[#F8FAFC] min-h-0 lg:overflow-hidden"
      style={{
        paddingTop: `calc(${VPAD} + env(safe-area-inset-top))`,
        paddingBottom: BOTPAD,
      }}
    >
      <div className="w-full max-w-[720px] px-[clamp(12px,3vw,24px)]">
        <LoginHeader />

        <LoginFormCard
          onGoToMain={() => navigate("/")}
          onGoToOnboarding={() => navigate("/onboarding")}
        />

        <LoginFooterText />
      </div>
    </aside>
  );
}
