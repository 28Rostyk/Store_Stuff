import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  createUser,
  current,
  logout,
  googleAuth,
  updateUser,
} from "./userOperation";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cart: [],
    token: "",
    formType: "signup",
    showForm: false,
    isLogin: false,
    loading: false,
    error: null,
    isRefreshing: false,
  },
  reducers: {
    addItemToCart: (state, { payload }) => {
      let newCart = [...state.cart];
      const found = state.cart.find(({ id }) => id === payload.id);

      if (found) {
        newCart = newCart.map((item) => {
          return item.id === payload.id
            ? { ...item, quantity: payload.quantity || item.quantity + 1 }
            : item;
        });
      } else newCart.push({ ...payload, quantity: 1 });
      state.cart = newCart;
    },
    toggleForm: (state, { payload }) => {
      state.showForm = payload;
    },
    toggleFormType: (state, { payload }) => {
      state.formType = payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, { payload }) => {
        const { newUser, accessToken } = payload;
        state.loading = false;
        state.user = newUser;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(createUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload;
        state.loading = false;
        state.user = user;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(current.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(current.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload;
        state.loading = false;
        state.user = user;
        state.token = accessToken;
        state.isLogin = true;
      })
      .addCase(current.rejected, (state, { payload }) => {
        state.loading = false;
        state.token = "";
        state.error = payload;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = {};
        state.token = "";
        state.isLogin = false;
        state.showForm = true;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(googleAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleAuth.fulfilled, (state, { payload }) => {
        const { user, accessToken } = payload;
        state.loading = false;
        state.user = user;
        state.token = accessToken;
        state.isLogin = true;
        state.showForm = false;
      })
      .addCase(googleAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload || "An error occurred";
      });
  },
});

export const {
  addItemToCart,
  addItemToFavourite,
  toggleForm,
  toggleFormType,
  resetError,
  removeItemFromFavourite,
} = userSlice.actions;
export default userSlice.reducer;
