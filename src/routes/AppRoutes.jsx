import { BrowserRouter, Navigate, Routes } from "react-router";
import { Route } from "react-router";
import { HomePage } from "../pages/home-page/HomePage";
import { RestaurantsPage } from "../pages/restaurants-page/RestaurantsPage";
import { RestaurantPage } from "../pages/restaurant-page/RestaurantPage";
import { Layout } from "../components/layout/Layout";
import { MenuPage } from "../pages/menu-page/MenuPage";
import { ReviewsPage } from "../pages/reviews-page/ReviewsPage";
import { DishPage } from "../pages/dish-page/DishPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="/restaurants/:restaurantId" element={<RestaurantPage />}>
            <Route index element={<Navigate to="menu" replace />} />
            <Route path="menu" element={<MenuPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
          </Route>
          <Route path="/dish/:dishId" element={<DishPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
