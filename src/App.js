import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Products from "./components/Products";
import Filter from "./components/Filter";
import Cart from "./components/Cart";
import { fetchProducts } from "./myredux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="grid-container">
      <header>
        <a href="/">Sneha Online Fashion Store</a>
      </header>
      <main>
        <div className="content">
          <div className="main">
            <Filter />
            <Products />
          </div>
          <div className="sidebar">
            <Cart />
          </div>
        </div>
      </main>
      <footer>All right is reserved</footer>
    </div>
  );
}

export default App;
