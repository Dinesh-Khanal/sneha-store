import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { sortProducts, filterProducts } from "../myredux";

const Filter = () => {
  const filteredProducts = useSelector((state) => state.products.filteredItems);
  const products = useSelector((state) => state.products.items);
  const size = useSelector((state) => state.products.size);
  const sort = useSelector((state) => state.products.sort);
  const dispatch = useDispatch();
  return (
    <div className="filter">
      <div className="filter-result">
        {!filteredProducts ? "Loading" : filteredProducts.length} Products
      </div>
      <div className="filter-sort">
        Order{" "}
        <select
          value={sort}
          onChange={(e) =>
            dispatch(sortProducts(filteredProducts, e.target.value))
          }
        >
          <option>Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter{" "}
        <select
          value={size}
          onChange={(e) => dispatch(filterProducts(products, e.target.value))}
        >
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
