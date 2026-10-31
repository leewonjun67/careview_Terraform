import React from "react";
import ReInputCard from "./components/ReInputCard";
import ReResults from "./components/ReResults";
import ReTipCard from "./components/ReTipCard";
import useReFoodSearch from "./hooks/useReFoodSearch";

export default function ReFoodPage() {
  const {
    items,
    results,
    searched,
    loading,
    error,
    addItem,
    removeItem,
    search,
  } = useReFoodSearch();   

  return (
    <div className="space-y-[clamp(14px,3vmin,24px)]">
      <ReInputCard
        items={items}
        onAdd={addItem}
        onRemove={removeItem}
        onSearch={search}
      />

      <ReResults
        results={results} 
        searched={searched}
        loading={loading}
        error={error}
      />

      <ReTipCard />
    </div>
  );
}
