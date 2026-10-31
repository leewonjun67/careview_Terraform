//svg버튼들
import React from "react";
import {
  SIGN_INPUT_WIDTH as W,
  SIGN_INPUT_HEIGHT as H,
} from "../constants/signLayout";

export default function SignButton({
  src,
  alt,
  onClick,
  disabled = false,
  style = {},
}) {
  return (
    <img
      src={src}
      alt={alt}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={alt}
      aria-disabled={disabled}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.(e);
        }
      }}
      draggable="false"
      className="block select-none outline-none focus:ring-2 focus:ring-[#D1E4FF] cursor-pointer"
      style={{
        width: W,
        height: H,
        padding: 0,
        margin: 0,
        boxSizing: "border-box",
        objectFit: "contain",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...style,
      }}
    />
  );
}
