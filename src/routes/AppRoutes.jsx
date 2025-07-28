import { BrowserRouter, Navigate, Routes } from "react-router";
import { Route } from "react-router";
import { HomePage } from "../pages/home.page";
import { RestaurantsPage } from "../pages/restaurants-page/RestaurantsPage";
import { RestaurantPage } from "../pages/restaurant.page";
import { Layout } from "../components/layout/Layout";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route
            path="/restaurants/:restaurantId"
            element={<RestaurantPage />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
