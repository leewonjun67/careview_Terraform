import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Main from '../pages/main'; // 폴더 명만 적어도 알아서 index를 찾아서 import함
import LoginPage from "../pages/login/LoginPage.jsx";
import SignPage from "../pages/sign/SignPage.jsx";
import OnboardingPage from "../pages/onboarding/OnboardingPage.jsx";
import DashBoardPage from "../pages/dashboard/DashBoardPage.jsx";
import DailyFoodPage from '../pages/dailyfood/DailyFoodPage.jsx';
import ReFoodPage from '../pages/food/refood/ReFoodPage.jsx';
import FoodPage from '../pages/food/FoodPage.jsx';
import RecodePage from '../pages/recode/RecodePage.jsx';
import SportsPage from '../pages/sports/SportsPage.jsx';
import MyPageButton from '../components/MyPageButton.jsx';
import EffectPage from '../pages/effect/EffectPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Outlet />
        <MyPageButton />
      </>
    ),
    children: [
      { index: true, element: <Main /> },
      { path: "login", element: <LoginPage /> },
      { path: "sign", element: <SignPage /> },
      { path: "onboarding", element: <OnboardingPage /> },
      { path: "dashboard", element: <DashBoardPage /> },
      { path: "dailyfood", element: <DailyFoodPage /> },
      { path: "refood", element: <ReFoodPage /> },
      { path: "food", element: <FoodPage /> },
      { path: "recode", element: <RecodePage /> },
      { path: "sports", element: <SportsPage /> },
      { path: "effect", element: <EffectPage /> },
    ],
  },
]);

export default router;
