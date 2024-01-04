import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { getCategories } from "../../features/categories/categoriesSlice";
import {
  getProducts,
  getAllProducts,
} from "../../features/products/productsSlice";
import { current } from "../../features/user/userSlice";

import AppRoutes from "../Routes/Routes";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Sidebar from "../Sidebar/Sidebar";
import UserForm from "../User/UserForm";

const App = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getAllProducts());
    dispatch(getProducts());
    dispatch(current());
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <UserForm />
      <div className="container">
        {pathname !== "/favourite" && <Sidebar />}
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
};

export default App;
