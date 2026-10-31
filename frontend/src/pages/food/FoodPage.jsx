import React, { useState } from "react";
import DailyHeader from "../dailyfood/components/DailyHeader.jsx";
import Footer from "../../layout/footer/footer.jsx";

import ReFoodTitle from "./common/ReFoodTitle.jsx";
import ReFoodTabs from "./common/ReFoodTabs.jsx";

import ReFoodPage from "./refood/ReFoodPage.jsx";
import MarketFoodPage from "./marketfood/MarketFoodPage.jsx";

export default function FoodPage() {
  const [tab, setTab] = useState("fridge"); // fridge | convenience

  return (
    <div className="w-full min-h-dvh bg-[#F9FAFB] overflow-x-hidden flex justify-center px-[clamp(16px,4vw,40px)]">
      <div className="w-full max-w-[1440px] py-[clamp(24px,4vh,40px)] space-y-[clamp(24px,4vh,36px)]">
        <DailyHeader />
        <ReFoodTitle />
        <ReFoodTabs value={tab} onChange={setTab} />

        {tab === "fridge" ? <ReFoodPage /> : <MarketFoodPage />}

        <Footer />
      </div>
    </div>
  );
}
