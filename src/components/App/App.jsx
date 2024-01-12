import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getCategories } from "../../features/categories/categoriesSlice";
import {
  getProducts,
  getAllProducts,
} from "../../features/products/productsOperation";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import UserForm from "../User/UserForm";
import AuthLayout from "../AuthLayout/AuthLayout";

import { ROUTES } from "../../utils/routes";

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <AuthLayout>
      <div className="app">
        <Header />
        <UserForm />
        <div className="container">
          {pathname !== `${ROUTES.FAVOURITE}` && <Sidebar />}
          <AppRoutes />
        </div>
        <Footer />
      </div>
    </AuthLayout>
  );
};

export default App;
