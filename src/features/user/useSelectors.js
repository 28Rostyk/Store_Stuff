import { createSelector } from "@reduxjs/toolkit";

const selectLoginAndToken = (state) => {
  return {
    isLogin: state.user.isLogin,
    token: state.user.token,
  };
};

const memoizedSelectLoginAndToken = createSelector(
  [selectLoginAndToken],
  (loginAndToken) => loginAndToken
);

export { memoizedSelectLoginAndToken };
