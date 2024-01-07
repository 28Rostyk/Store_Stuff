import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";
import { toggleForm } from "../../features/user/userSlice";

import { ROUTES } from "../../utils/routes";

const PrivateRoutes = () => {
  const { isLogin, token } = useSelector(({ user }) => user);
  const dispatch = useDispatch();

  if (!isLogin && token) {
    return <Loader />;
  }

  if (!isLogin && !token) {
    dispatch(toggleForm(true));
    return <Navigate to={ROUTES.HOME} />;
  }

  return <Outlet />;
};

export default PrivateRoutes;
