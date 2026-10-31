const S = {
  cardPad: "clamp(14px, 2.2vmin, 20px)",
  titleFS: "clamp(14px, 1.8vmin, 18px)",
  bodyFS: "clamp(12px, 1.5vmin, 15px)",
};

function SectionHeader({ count }) {
  return (
    <div className="flex items-center gap-[clamp(6px,1vmin,8px)]">
      <div
        className="text-[#1E2939] font-semibold"
        style={{ fontSize: S.titleFS }}
      >
        추천 레시피
      </div>
      <div className="text-[clamp(11px,1.3vmin,13px)] text-[#4A5565] border border-[#D1D5DC] bg-white/70 rounded-full px-[8px] py-[2px]">
        {count}개 발견
      </div>
    </div>
  );
}

function ListBlock({ title, children }) {
  return (
    <div>
      <div className="text-[#1E2939] font-semibold text-[clamp(12px,1.5vmin,14px)] mb-[clamp(6px,1vmin,8px)]">
        {title}
      </div>
      {children}
    </div>
  );
}

function RecipeCard({ meal }) {
  const firstStep =
    meal?.cooking_steps?.[0]?.step_description ||
    "이 재료들로 만들 수 있는 요리예요.";

  const sortedSteps = Array.isArray(meal?.cooking_steps)
    ? [...meal.cooking_steps].sort(
        (a, b) => (a.step_number ?? 0) - (b.step_number ?? 0)
      )
    : [];

  const ingredients = Array.isArray(meal?.ingredients)
    ? meal.ingredients
    : [];

  return (
    <article
      className="bg-white/70 border-2 border-[#D1D5DC] rounded-2xl"
      style={{ padding: S.cardPad }}
    >
      {/* 제목 */}
      <div className="flex items-center justify-between">
        <div
          className="text-[#111827] font-semibold"
          style={{ fontSize: S.titleFS }}
        >
          {meal?.name || "이름 없는 레시피"}
        </div>
      </div>

      {/* 한 줄 요약 (첫 번째 조리 단계 활용) */}
      <p
        className="mt-[clamp(6px,1.2vmin,8px)] text-[#4A5565] leading-relaxed"
        style={{ fontSize: S.bodyFS }}
      >
        {firstStep}
      </p>

      <div className="mt-[clamp(12px,2vmin,16px)] grid grid-cols-1 md:grid-cols-2 gap-[clamp(10px,2vmin,14px)]">
        {/* 재료 목록 */}
        <ListBlock title="필요한 재료">
          <ul className="space-y-[clamp(4px,0.8vmin,6px)] text-[#111827] text-[clamp(12px,1.5vmin,14px)]">
            {ingredients.map((ing, idx) => (
              <li key={idx} className="flex gap-[6px]">
                <span>•</span>
                <span>
                  {ing.ingredient?.name || "재료"}{" "}
                  {ing.amount}
                  {ing.unit || ""}
                </span>
              </li>
            ))}
          </ul>
        </ListBlock>

        {/* 조리 방법 */}
        <ListBlock title="조리 방법">
          <ol className="space-y-[clamp(4px,0.8vmin,6px)] text-[#111827] text-[clamp(12px,1.5vmin,14px)] list-decimal pl-[18px]">
            {sortedSteps.map((st) => (
              <li key={st.step_number ?? st.step_description}>
                {st.step_description}
              </li>
            ))}
          </ol>
        </ListBlock>
      </div>
    </article>
  );
}

export default function ReResults({ searched, results }) {
  if (!searched) return null;

  const safeResults = Array.isArray(results) ? results : [];

  return (
    <section className="space-y-[clamp(10px,2vmin,14px)]">
      <SectionHeader count={safeResults.length} />

      {safeResults.length === 0 ? (
        <div className="bg-white/70 border border-[#D1D5DC] rounded-2xl p-[clamp(14px,2vmin,18px)] text-[#4A5565] text-[clamp(12px,1.5vmin,14px)]">
          해당 재료로 만들 수 있는 레시피가 아직 없어요. 재료를 더 추가해보세요!
        </div>
      ) : (
        safeResults.map((meal) => (
          <RecipeCard
            key={meal.item_id ?? meal.name}
            meal={meal}
          />
        ))
      )}
    </section>
  );
}
