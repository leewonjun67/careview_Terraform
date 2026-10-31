import React from "react";
import { useNavigate } from "react-router-dom";

import SignHeader from "./SignHeader";
import SignFormCard from "./SignFormCard";
import SignFooterText from "./SignFooterText";

import {
  SIGN_VERTICAL_PADDING as VPAD,
  SIGN_BOTTOM_PADDING as BOTPAD,
} from "../constants/signLayout";

export default function SignLeft() {
  const navigate = useNavigate();

  return (
    <aside
      className="w-full min-h-dvh box-border flex items-start justify-center bg-[#F8FAFC] overflow-x-hidden overflow-y-visible"
      style={{
        paddingTop: `calc(${VPAD} + env(safe-area-inset-top))`,
        paddingBottom: BOTPAD,
      }}
    >
      <div className="w-full max-w-[720px] px-[clamp(12px,3vw,24px)]">
        <SignHeader />

        {/* 폼이 들어있는 카드 전체 */}
        <SignFormCard onSuccess={() => navigate("/login")} />

        <SignFooterText />
      </div>
    </aside>
  );
}
