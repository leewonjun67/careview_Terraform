import { api, withAuth } from "../client";

export async function fetchMainRecommendations() {
  const res = await api.get(
    "/api/meals/recommendations/main",
    withAuth()
  );
  return res.data;
}

//냉장고 재료 기반 추천
export async function fetchMealsByIngredients(ingredientNames = []) {
  const names = (ingredientNames || [])
    .map((v) => (v ?? "").toString().trim())
    .filter(Boolean);

  // 아무 재료도 없으면 바로 빈 배열
  if (!names.length) return [];

  // FastAPI가 기대하는 형식대로
  const params = new URLSearchParams();
  names.forEach((name) => params.append("ingredient_names", name));

  const res = await api.get(
    "/api/meals/recommendations/by-ingredients",
    withAuth({ params })
  );

  // 응답
  return res.data;
}
//편의점 조합
export async function fetchConvenienceSets() {
  const res = await api.get(
    "/api/meals/convenience/sets",
    withAuth()
  );
  return res.data;
}