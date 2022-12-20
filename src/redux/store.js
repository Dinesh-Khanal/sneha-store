import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../redux/productSlice";
import cartReducer from "../redux/cartSlice";
import orderReducer from "../redux/orderSlice";
const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
  },
});
export default store;
