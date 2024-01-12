import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { current } from "../../features/user/userOperation";

const AuthLayout = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(current());
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthLayout;
