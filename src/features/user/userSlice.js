import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as api from "../../shared/services/user";

export const createUser = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.register(data);
      return result;
    } catch ({ response }) {
      if (response.status === 409) {
        return rejectWithValue(
          "Користувач з такими даними вже зареєстрований!"
        );
      } else {
        return rejectWithValue(
          "Під час реєстрації виникла помилка. Спробуйте ще!"
        );
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api.login(data);
      return result;
    } catch ({ response }) {
      if (response) {
        const { status, data: responseData } = response;

        if (status === 401) {
          return rejectWithValue("Невірний e-mail або пароль!");
        } else if (status === 404) {
          return rejectWithValue(
            "Користувача не знайдено! Зареєструйтеся, будь ласка!"
          );
        } else if (status === 400) {
          return rejectWithValue(
            responseData.message ||
              "Некорректний запит! Перевірте введену інформацію."
          );
        } else {
          return rejectWithValue("Внутрішня помилка. Спробуйте пізніше!");
        }
      } else {
        return rejectWithValue(
          "Під час входу виникла помилка. Спробуйте пізніше!"
        );
      }
    }
  }
);

export const current = createAsyncThunk(
  "auth/current",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { user } = getState();
      const data = await api.current(user.token);
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  },
  {
    condition: (_, { getState }) => {
      const { user } = getState();
      if (!user.token) {
        return false;
      }
    },
  }
);

export const googleAuth = createAsyncThunk(
  "auth/google",
  async (token, { rejectWithValue }) => {
    try {
      const result = await api.current(token);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.logout();
      return data;
    } catch ({ response }) {
      return rejectWithValue(response.data.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    cart: [],
    favourite: [],
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
    addItemToFavourite: (state, { payload }) => {
      let newItem = [...state.favourite];
      const found = state.favourite.find(({ id }) => id === payload.id);

      if (found) {
        newItem = newItem.map((item) => {
          return item.id === payload.id ? { ...item } : item;
        });
      } else newItem.push({ ...payload });
      state.favourite = newItem;
    },
    removeItemFromFavourite: (state, { payload }) => {
      const updatedFavourite = state.favourite.filter(
        ({ id }) => id !== payload.id
      );
      state.favourite = updatedFavourite;
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
      })
      .addCase(googleAuth.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
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
