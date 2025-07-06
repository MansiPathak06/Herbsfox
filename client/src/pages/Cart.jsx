// import React, { useState } from "react";
import React from "react";
import Footer from "./Footer";
import "./cart.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // const [quantity, setQuantity] = useState(1);

  // const increase = () => setQuantity((prev) => prev + 1);
  // const decrease = () => {
  //   if (quantity > 1) setQuantity((prev) => prev - 1);
  // };

  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const gotocheckout = () => {
    navigate("/Checkout");
  };

  const returnntoshop = () => {
    navigate("/Shop");
  };

  const deliveryCharge = 60;
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryCharge;

  return (
    <div>
      <h1 className="cart-heading">Cart</h1>
      {cart.length === 0 ? (
        <p className="empty-code">YOUR CART IS CURRENTLY EMPTY.</p>
      ) : (
        <div className="cart-main">
          <div className="cart-left">
            <h2 className="product-heading">Product</h2>
            <hr className="line" />

            {cart.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div>
                  <h3>{item.name}</h3>
                  <p>Weight: {item.weight}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>

                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.id)}
                  >
                    remove-item
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-right">
            <h2 className="product-heading">Cart-totals</h2>
            <hr className="line" />
            <p>Add a coupon</p>
            <hr className="line" />
            <p>Subtotal: ₹{subtotal}</p>
            <p>Delivery Charges: ₹{deliveryCharge}</p>
            <p className="cod">Cash on delivery</p>
            <div className="totals">
              <h3 className="Total-heading">Total: </h3>
              <h3 data-total-price="true">₹{total}</h3>
            </div>
            <hr className="line" />
            <button className="checkout-btn" onClick={gotocheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      <div className="return-button-wrapper">
        <button className="returntoshop" onClick={returnntoshop}>
          RETURN TO SHOP
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
