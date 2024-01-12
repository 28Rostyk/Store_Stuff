import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../shared/Loader/Loader";

import { ROUTES } from "../../utils/routes";
import { current } from "@reduxjs/toolkit";

const PublicRoute = () => {
  console.log("PrivateRoutes component rendering");
  const { isLogin, token } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  if (!isLogin && token) {
    dispatch(current());
    return <Loader />;
  }

  if (isLogin) {
    return <Navigate to={ROUTES.PROFILE} />;
  }

  return <Outlet />;
};

export default PublicRoute;
