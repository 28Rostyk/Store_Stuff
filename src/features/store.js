import { configureStore } from "@reduxjs/toolkit";
import categoriesSlice from "./categories/categoriesSlice";
import productsSlice from "./products/productsSlice";
import { apiSlice } from "./api/apiSlice";
import userSlice from "./user/userSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";

const persistConfig = {
  key: "user",
  storage,
  whitelist: ["token"],
};

const persistedAuthReducer = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    categories: categoriesSlice,
    products: productsSlice,
    user: persistedAuthReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk, apiSlice.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
