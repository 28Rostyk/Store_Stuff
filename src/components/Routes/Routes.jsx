import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct";
import FavouriteProducts from "../Products/FavouriteProducts";
import TempAuthPage from "../User/TempAuthPage";
import Profile from "../Profile/Profile.jsx";
import PrivateRoutes from "./PrivateRoutes.jsx";
// import PublicRoute from "./PublicRoutes.jsx";
import SingleCategory from "../Categories/SingleCategory.jsx";

import { ROUTES } from "../../utils/routes.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path={ROUTES.PRODUCT} element={<SingleProduct />} />
      <Route path={ROUTES.CATEGORY} element={<SingleCategory />} />
      <Route path={ROUTES.TEMP} element={<TempAuthPage />} />
      <Route element={<PrivateRoutes />}>
        <Route path={ROUTES.FAVOURITE} element={<FavouriteProducts />} />
        <Route path={ROUTES.PROFILE} element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} />} />
    </Routes>
  );
};

export default AppRoutes;
