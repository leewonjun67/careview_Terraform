//회원가입 입력필드
import React from "react";
import {
  SIGN_INPUT_WIDTH as W,
  SIGN_INPUT_HEIGHT as H,
} from "../constants/signLayout";

function renderIconPaths(variant) {
  switch (variant) {
    case "user":
      return (
        <>
          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path d="M3 20a9 9 0 0 1 18 0" />
        </>
      );
    case "email":
      return (
        <>
          <path d="M4 6h16v12H4z" />
          <path d="m22 6-10 7L2 6" />
        </>
      );
    case "password":
    default:
      return (
        <>
          <rect x="4" y="11" width="16" height="9" rx="2" />
          <path d="M8 11V8a4 4 0 1 1 8 0v3" />
        </>
      );
  }
}

export default function SignTextField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  iconVariant = "user",
  labelMarginTop,
  inputProps = {},
}) {
  return (
    <>
      <label
        className="self-center text-[#364153]"
        style={{
          width: W,
          marginTop: labelMarginTop || 0,
          fontSize: "clamp(12px, 2.3vmin, 14px)",
        }}
      >
        {label}
      </label>
      <div
        className="relative self-center"
        style={{
          width: W,
          height: H,
          marginTop: "clamp(6px, 1.6vmin, 8px)",
        }}
      >
        <svg
          aria-hidden="true"
          className="absolute block text-[#9CA3AF]"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          style={{
            left: "clamp(10px, 2.2vmin, 16px)",
            top: "50%",
            transform: "translateY(-50%)",
            width: "clamp(18px, 2.6vmin, 22px)",
            height: "clamp(18px, 2.6vmin, 22px)",
          }}
        >
          {renderIconPaths(iconVariant)}
        </svg>

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...inputProps}
          className="
            block
            rounded-[12px]
            border border-[#E5E7EB]
            outline-none
            placeholder-[#717182]
          "
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            paddingLeft: "clamp(40px, 5.5vmin, 52px)",
            paddingRight: "clamp(12px, 2.2vmin, 16px)",
            fontSize: "clamp(12px, 2.2vmin, 16px)",
            backgroundColor: "#FFFFFF",
          }}
        />
      </div>
    </>
  );
}