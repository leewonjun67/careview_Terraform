import React from "react";
import main1 from "../../assets/main/main1.svg";
import MainCta from "./components/MainCta.jsx";
import Footer from "../../layout/footer/footer.jsx";

export default function MainPage() {
  const heroGap = "clamp(64px, 12.11vh, 160px)";

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <section className="w-screen" style={{ "--hero-gap": heroGap }}>
        <div className="w-screen h-[calc(100vh-var(--hero-gap))] select-none">
          <img
            src={main1}
            alt="main visual"
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
        <div style={{ height: "var(--hero-gap)" }} />
      </section>

      {/* 이후 섹션들 */}
      <main className="w-screen">
        <section className="px-[clamp(16px,4vw,72px)] pt-[clamp(48px,8vh,96px)] pb-[clamp(130px,12vh,150px)]">
          <MainCta />
        </section>
      </main>

      <Footer />
    </div>
  );
}
