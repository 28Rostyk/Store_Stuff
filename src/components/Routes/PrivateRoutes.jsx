import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Loader from "../../shared/Loader/Loader";
import { toggleForm } from "../../features/user/userSlice";
import { memoizedSelectLoginAndToken } from "../../features/user/useSelectors";

import { ROUTES } from "../../utils/routes";

const PrivateRoutes = () => {
  const { token } = useSelector(({ user }) => user);
  const { isLogin } = useSelector(memoizedSelectLoginAndToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin && token) {
      // Логіка, коли користувач не увійшов, але має токен
      navigate(ROUTES.HOME); // Перенаправлення на HOME, якщо необхідно
    }

    if (!isLogin && !token) {
      navigate(ROUTES.HOME); // Перенаправлення на HOME, якщо необхідно
    }
  }, [isLogin, token, dispatch, navigate]);

  return <Outlet />;
};

export default PrivateRoutes;
