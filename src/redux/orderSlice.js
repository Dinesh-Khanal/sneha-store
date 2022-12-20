import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    createOrder: (state, action) => {
      state.order = action.payload;
    },
    clearOrder: (state) => {
      state.order = null;
    },
  },
});
export const { createOrder, clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
