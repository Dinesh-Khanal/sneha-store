import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let alreadyExist = false;
      const items = state.cartItems.slice();
      items.forEach((itm) => {
        if (itm._id === action.payload._id) {
          alreadyExist = true;
          itm.count++;
        }
      });
      if (!alreadyExist) {
        items.push({ ...action.payload, count: 1 });
      }
      state.cartItems = items;
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
