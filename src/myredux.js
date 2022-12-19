import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";

//Actions
export const fetchProducts = () => async (dispatch) => {
  const res = await fetch("/api/products");
  const data = await res.json();
  dispatch({ type: "FETCH_PRODUCTS", payload: data });
};

export const addToCart = (product) => (dispatch, getState) => {
  const cartItems = getState().cart.cartItems.slice();
  let alreadyExists = false;
  cartItems.forEach((x) => {
    if (x._id === product._id) {
      alreadyExists = true;
      x.count++;
    }
  });
  if (!alreadyExists) {
    cartItems.push({ ...product, count: 1 });
  }
  dispatch({
    type: "ADD_TO_CART",
    payload: { cartItems },
  });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

export const removeFromCart = (product) => (dispatch, getState) => {
  const cartItems = getState()
    .cart.cartItems.slice()
    .filter((x) => x._id !== product._id);
  dispatch({ type: "REMOVE_FROM_CART", payload: { cartItems } });
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};
export const clearCart = () => (dispatch) => {
  const cartItems = [];
  dispatch({ type: "CLEAR_CART", payload: { cartItems } });
};

export const filterProducts = (products, size) => (dispatch) => {
  dispatch({
    type: "FILTER_PRODUCTS_BY_SIZE",
    payload: {
      size: size,
      sort: "latest",
      items:
        size === ""
          ? products
          : products.filter((x) => x.availableSizes.indexOf(size) >= 0),
    },
  });
};

export const sortProducts = (filteredProducts, sort) => (dispatch) => {
  const sortedProducts = filteredProducts.slice();
  if (sort === "latest") {
    sortedProducts.sort((a, b) => (a._id > b._id ? 1 : -1));
  } else {
    sortedProducts.sort((a, b) =>
      sort === "lowest"
        ? a.price > b.price
          ? 1
          : -1
        : a.price > b.price
        ? -1
        : 1
    );
  }
  dispatch({
    type: "ORDER_PRODUCTS_BY_PRICE",
    payload: {
      sort: sort,
      items: sortedProducts,
    },
  });
};
//create action for createOrder
export const createOrder = (order) => async (dispatch) => {
  try {
    const resp = await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    const data = await resp.json();
    dispatch({ type: "CREATE_ORDER", payload: data });
    localStorage.clear("cartItems");
  } catch (err) {
    console.log(err);
  }
};
//clear order
export const clearOrder = () => (dispatch) => {
  dispatch({ type: "CLEAR_ORDER" });
};
//Reducer
const initialState = {};
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FILTER_PRODUCTS_BY_SIZE":
      return {
        ...state,
        size: action.payload.size,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case "ORDER_PRODUCTS_BY_PRICE":
      return {
        ...state,
        sort: action.payload.sort,
        filteredItems: action.payload.items,
      };
    case "FETCH_PRODUCTS":
      return { items: action.payload, filteredItems: action.payload };
    default:
      return state;
  }
};

const cartReducer = (
  state = { cartItems: JSON.parse(localStorage.getItem("cartItems") || "[]") },
  action
) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { cartItems: action.payload.cartItems };
    case "REMOVE_FROM_CART":
      return { cartItems: action.payload.cartItems };
    case "CLEAR_CART":
      return { cartItems: action.payload.cartItems };
    default:
      return state;
  }
};
const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case "CREATE_ORDER":
      return { order: action.payload };
    case "CLEAR_ORDER":
      return { order: null };
    default:
      return state;
  }
};

const reducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

//store
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(
  reducer,
  composeEnhancer(applyMiddleware(ReduxThunk))
);
