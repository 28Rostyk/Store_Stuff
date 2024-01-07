import { createSlice } from "@reduxjs/toolkit";
import { shuffle } from "../../utils/common";
import { getProducts, getAllProducts } from "./productsOperation";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    allList: [],
    list: [],
    filtered: [],
    totalPage: 0,
    currentPage: 1,
    related: [],
    isLoading: false,
  },
  reducers: {
    filterByPrice: (state, { payload }) => {
      state.filtered = state.allList.filter(({ price }) => price < payload);
    },
    getRelatedProducts: (state, { payload }) => {
      const list = state.allList.filter(
        ({ category: { id } }) => id === payload
      );
      state.related = shuffle(list);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state, { payload }) => {
      state.isLoading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, { payload }) => {
      state.allList = payload.products;
      state.isLoading = false;
    });
    builder.addCase(getAllProducts.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(getProducts.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(getProducts.fulfilled, (state, { payload }) => {
      state.list = payload.products;
      state.totalPage = payload.totalPage;
      state.currentPage = payload.currentPage;
      state.isLoading = false;
    });
    builder.addCase(getProducts.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { filterByPrice, getRelatedProducts } = productsSlice.actions;
export default productsSlice.reducer;
