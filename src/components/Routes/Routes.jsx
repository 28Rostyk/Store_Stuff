import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import SingleProduct from "../Products/SingleProduct";
import FavouriteProducts from "../Products/FavouriteProducts";

// import { ROUTES } from "../../utils/routes.js";

const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />} />
    <Route path="/products/:id" element={<SingleProduct />} />
    <Route path="/favourite" element={<FavouriteProducts />} />
  </Routes>
);

export default AppRoutes;
