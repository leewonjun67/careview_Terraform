import React from "react";
import { useNavigate } from "react-router-dom";
import Das2 from "../../../assets/dashboard/das2.svg?react";
import Das3 from "../../../assets/dashboard/das3.svg?react";
import Das4 from "../../../assets/dashboard/das4.svg?react";

const S = {
  width:  "clamp(400px, 95vw, 1400px)", 
  height: "clamp(130px, 25vmin, 300px)",
  gap:     "clamp(4px, 6vmin, 120px)",    
  marginY: "clamp(30px, 20vmin, 200px)",  
};

function SvgButton({ Svg, to = "#", label }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!to || to === "#") return;
    navigate(to);
  };

  return (
    <div
      className="w-full flex justify-center"
      style={{ padding: 0, margin: 0 }}
    >
      <Svg
        role="button"
        aria-label={label}
        onClick={handleClick}
        preserveAspectRatio="none"
        style={{
          width: S.width,
          height: S.height,
          maxWidth: "100%",     
          display: "block",
        }}
        className="
          cursor-pointer
          hover:opacity-85
          transition
          select-none
        "
      />
    </div>
  );
}

export default function QuickLinks() {
  return (
    <section
      className="w-full flex flex-col items-center"
      style={{
        rowGap: S.gap,
        marginTop: S.marginY,
        marginBottom: S.marginY,
      }}
    >
      <SvgButton Svg={Das2} to="/sports"          label="Sports" />
      <SvgButton Svg={Das3} to="/dailyfood" label="Food" />
      <SvgButton Svg={Das4} to="/recode"          label="Record" />
    </section>
  );
}
