import React, { useState } from "react";
import formatCurrency from "../util";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import Zoom from "react-reveal/Zoom";
import { addToCart } from "../redux/cartSlice";

const Products = () => {
  const { products, sort, size, status } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const filteredProducts =
    size === ""
      ? products.slice()
      : products.filter((p) => p.availableSizes.includes(size));
  if (sort === "lowest") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  if (sort === "highest") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }
  const openModal = (product) => {
    setProduct(product);
    setModalOpen(true);
  };
  const closeModal = () => {
    setProduct(null);
    setModalOpen(false);
  };
  return (
    <div>
      {status === "LOADING" ? (
        <div>Loading...</div>
      ) : (
        <ul className="products">
          {filteredProducts.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => dispatch(addToCart(product))}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {product && (
        <Modal
          isOpen={modalOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
        >
          <Zoom>
            <button className="close-modal" onClick={closeModal}>
              X
            </button>
            <div className="product-details">
              <img src={product.image} alt={product.title} />
              <div className="product-details-description">
                <p>
                  <strong>{product.title}</strong>
                </p>
                <p>{product.description}</p>
                <p>
                  Available Sizes:{" "}
                  {product.availableSizes.map((x, index) => (
                    <span key={index}>
                      {" "}
                      <button className="button" key={index}>
                        {x}
                      </button>
                    </span>
                  ))}
                </p>
                <div className="product-price">
                  <div>Price: {formatCurrency(product.price)}</div>
                  <button
                    className="button primary"
                    onClick={() => {
                      closeModal();
                      dispatch(addToCart(product));
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </Zoom>
        </Modal>
      )}
    </div>
  );
};

export default Products;
