import { createAsyncThunk } from "@reduxjs/toolkit";
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

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async (payload, thunkAPI) => {
    try {
      const data = await api.userUpdate(payload);
      return data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue({
        message: err.message,
        status: err.response?.status || 500,
      });
    }
  }
);
