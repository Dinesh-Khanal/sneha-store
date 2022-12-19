import React, { useState } from "react";
import formatCurrency from "../util";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../myredux";

const Products = () => {
  const products = useSelector((state) => state.products.filteredItems);
  const [product, setProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();

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
      {!products ? (
        <div>Loading...</div>
      ) : (
        <ul className="products">
          {products.map((product) => (
            <li key={product._id}>
              <div className="product">
                <a href={"#" + product._id} onClick={() => openModal(product)}>
                  <img src={product.image} alt={product.title} />
                  <p>{product.title}</p>
                </a>
                <div className="product-price">
                  <div>{formatCurrency(product.price)}</div>
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="button primary"
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
                  <span>
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
                    dispatch(addToCart(product));
                    closeModal();
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Products;
