import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortProducts, filterProducts } from "../redux/productSlice";

const Filter = () => {
  const { products, size, sort } = useSelector((state) => state.products);
  const filteredProducts =
    size === ""
      ? products
      : products.filter((p) => p.availableSizes.includes(size));
  const dispatch = useDispatch();

  const handleSort = (e) => {
    dispatch(sortProducts(e.target.value));
  };

  const handleFilter = (e) => {
    dispatch(filterProducts(e.target.value));
  };
  return (
    <div className="filter">
      <div className="filter-result">
        {!filteredProducts ? "Loading" : filteredProducts.length} Products
      </div>
      <div className="filter-sort">
        Order{" "}
        <select value={sort} onChange={handleSort}>
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter{" "}
        <select value={size} onChange={handleFilter}>
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
