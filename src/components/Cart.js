import React, { useState } from "react";
import formatCurrency from "../util";
import Modal from "react-modal";
//import Fade from "react-reveal/Fade";
//import Zoom from "react-reveal/Zoom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, createOrder, clearCart, clearOrder } from "../myredux";
//import MyPayPal from "./MyPayPal";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const order = useSelector((state) => state.orders.order);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
  });
  const totalPrice = cartItems.reduce((a, c) => a + c.price * c.count, 0);
  const [showCheckOut, setShowCheckOut] = useState(false);
  const dispatch = useDispatch();
  const handleInput = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleSubmit = (event) => {
    //event.preventDefault(); payPal checkout btn does not submit form so comment out it.
    const newOrder = {
      name: customer.name,
      email: customer.email,
      address: customer.address,
      cartItems,
      total: totalPrice,
    };
    dispatch(createOrder(newOrder));
    dispatch(clearCart());
    setShowCheckOut(false);
  };
  const closeModal = () => {
    dispatch(clearOrder());
  };
  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="cart cart-header">Cart is empty</div>
      ) : (
        <div className="cart cart-header">
          You have {cartItems.length} products in the cart
        </div>
      )}
      {order && (
        <Modal isOpen={true} onRequestClose={closeModal} ariaHideApp={false}>
          <button className="close-modal" onClick={closeModal}>
            x
          </button>
          <div className="order-details">
            <h3 className="success-message">Your order has been placed</h3>
            <h2>Order id: {order._id}</h2>
            <ul>
              <li>
                <div>Name:</div>
                <div>{order.name}</div>
              </li>
              <li>
                <div>Email:</div>
                <div>{order.email}</div>
              </li>
              <li>
                <div>Address:</div>
                <div>{order.address}</div>
              </li>
              <li>
                <div>Date:</div>
                <div>{order.createdAt}</div>
              </li>
              <li>
                <div>Total:</div>
                <div>{formatCurrency(order.total)}</div>
              </li>
              <li>
                <div>Cart Items:</div>
                <div>
                  {order.cartItems.map((x) => (
                    <div>
                      {x.count} {" x "} {x.title}
                    </div>
                  ))}
                </div>
              </li>
            </ul>
          </div>
        </Modal>
      )}
      <div>
        <div className="cart">
          <ul className="cart-items">
            {cartItems.map((item) => (
              <li key={item._id}>
                <div>
                  <img src={item.image} alt={item.title} />
                </div>
                <div>
                  <div>{item.title}</div>
                  <div className="right">
                    {formatCurrency(item.price)} X {item.count}{" "}
                    <button
                      onClick={() => dispatch(removeFromCart(item))}
                      className="button"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {cartItems.length !== 0 && (
          <div className="cart">
            <div className="total">
              <div>
                Total:{" "}
                {formatCurrency(
                  cartItems.reduce((a, c) => a + c.price * c.count, 0)
                )}
              </div>
              <button
                onClick={() => setShowCheckOut(true)}
                className="button primary"
              >
                Proceed
              </button>
            </div>
          </div>
        )}
        {showCheckOut && (
          <div className="cart">
            <form onSubmit={handleSubmit}>
              <ul className="form-container">
                <li>
                  <label>Name</label>
                  <input
                    name="name"
                    required
                    type="text"
                    value={customer.name}
                    onChange={handleInput}
                  />
                </li>
                <li>
                  <label>Email</label>
                  <input
                    name="email"
                    required
                    type="email"
                    value={customer.email}
                    onChange={handleInput}
                  />
                </li>
                <li>
                  <label>Address</label>
                  <input
                    name="address"
                    required
                    type="text"
                    value={customer.address}
                    onChange={handleInput}
                  />
                </li>
                <li>
                  <button className="button primary" type="submit">
                    Checkout
                  </button>
                  {/* <div className="payPal-btn">
                      <MyPayPal submit={handleSubmit} totalPrice={totalPrice} />
                    </div> */}
                </li>
              </ul>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
