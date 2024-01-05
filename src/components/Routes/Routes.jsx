import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct";
import FavouriteProducts from "../Products/FavouriteProducts";
import TempAuthPage from "../User/TempAuthPage";
import Profile from "../Profile/Profile.jsx";

import { ROUTES } from "../../utils/routes.js";

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route path={ROUTES.FAVOURITE} element={<FavouriteProducts />} />
      <Route path={ROUTES.PROFILE} element={<Profile />} />
      <Route path={ROUTES.TEMP} element={<TempAuthPage />} />
    </Routes>
  );
};

export default AppRoutes;
