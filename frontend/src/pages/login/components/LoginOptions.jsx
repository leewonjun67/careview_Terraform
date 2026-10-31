//로그인 옵션
import React from "react";
import { LOGIN_INPUT_WIDTH as W } from "../constants/loginLayout";

export default function LoginOptions({ keepLogin, setKeepLogin }) {
  return (
    <div
      className="self-center flex items-center justify-between"
      style={{ width: W, marginTop: "clamp(10px, 2.4vmin, 14px)" }}
    >
      <label
        className="flex items-center text-[#4A5565]"
        style={{
          gap: "clamp(8px, 2.2vmin, 11px)",
          fontSize: "clamp(12px, 2.3vmin, 14px)",
        }}
      >
        <input
          type="checkbox"
          className="accent-[#111827]"
          style={{
            width: "clamp(13px, 2.2vmin, 15px)",
            height: "clamp(13px, 2.2vmin, 15px)",
          }}
          checked={keepLogin}
          onChange={(e) => setKeepLogin(e.target.checked)}
        />
        로그인 상태 유지
      </label>
      <a
        className="text-[#4A5565] hover:text-[#111827]"
        style={{ fontSize: "clamp(12px, 2.3vmin, 14px)" }}
        href="#"
      >
        비밀번호 찾기
      </a>
    </div>
  );
}
