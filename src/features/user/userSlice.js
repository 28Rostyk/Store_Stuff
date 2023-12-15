import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// import { BASE_URL } from "../../utils/constats";
import * as api from "../../shared/services/user";

export const createUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.register(payload);
      return res.data;
    } catch (error) {
      if (error.response) {
        // Помилка від сервера (наприклад, 409 Конфлікт)
        if (error.response.status === 409) {
          return rejectWithValue(
            "Користувач з такими даними вже зареєстрований!"
          );
        } else {
          return rejectWithValue(
            `Помилка сервера: ${error.response.status}. Спробуйте ще раз!`
          );
        }
      } else {
        // Інші технічні помилки (мережа, тощо)
        return rejectWithValue(
          "Під час реєстрації виникла технічна помилка. Спробуйте ще раз!"
        );
      }
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.login(payload);
      return res;
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
      // console.log(response.data.message);
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
    isLoading: false,
    error: null,
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
    builder.addCase(createUser.pending, (state, _) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.user = payload;
      state.isLoading = false;
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // builder.addCase(loginUser.fulfilled, (state, { payload }) => {
    //   // const { user, accessToken } = payload;
    //   console.log(payload);
    //   state.isLoading = false;
    //   state.currentUser = payload.user;
    //   state.token = payload.user.token;
    //   state.isLogin = true;
    // });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      const { user, token } = payload;
      state.isLoading = false;
      state.user = user;
      state.token = token; // Додайте цей рядок для оновлення токену
      state.isLogin = true;
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    builder.addCase(current.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(current.fulfilled, (state, { payload }) => {
      const { user, token } = payload;
      state.isLoading = false;
      state.user = user;
      state.token = token;
      state.isLogin = true;
    });
    builder.addCase(current.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.token = "";
      state.error = payload;
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.token = "";
      state.isLogin = false;
    });
    builder.addCase(logout.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    });
    // builder.addCase(current.fulfilled, (state, { payload }) => {
    //   const { user, token } = payload;
    //   state.isLoading = false;
    //   state.user = user;
    //   state.token = token;
    //   state.isLogin = true;
    // });

    // builder.addCase(getAllProducts.rejected, (state) => {
    //   state.isLoading = false;
    // });
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
