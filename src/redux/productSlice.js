import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("product/fetch", async () => {
  const res = await fetch("/api/products");
  return await res.json();
});
const initialState = {
  products: [],
  sort: "latest",
  size: "",
  status: "READY",
  errorMessage: "",
};
const productSlice = createSlice({
  name: "product",
  initialState,
  //reducers is actually reducer function (ie action) we did in earlier version of redux
  reducers: {
    filterProducts: (state, action) => {
      state.size = action.payload;
    },
    //payload = "latest" or "lowest"
    sortProducts: (state, action) => {
      state.sort = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "READY";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "ERROR";
        state.errorMessage = action.error.message;
      });
  },
});
export const { filterProducts, sortProducts } = productSlice.actions;
export default productSlice.reducer;
