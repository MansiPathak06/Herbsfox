import { React, useState } from "react";
import Footer from "./Footer";
import "./checkout.css";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (!storedUser) {
    alert("Please log in to proceed to checkout.");
    navigate("/account");
  } else {
    // Split full name if needed
    const fullName = storedUser.name || "";
    const nameParts = fullName.trim().split(" ");
    setFirstName(nameParts[0] || "");
    setLastName(nameParts.slice(1).join(" ") || "");

    setEmail(storedUser.email || "");
    setPhone(storedUser.phone || "");

    setCountry("India");
    // You may fetch address from server here if needed
    // setAddress(...), setCity(...), etc.
  }
}, [navigate]);


  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const isValidPhone = /^\d{10}$/.test(phone); // Simple 10-digit validation
  const isValidPin = /^\d{6}$/.test(pinCode); // for Indian pin code

  const deliveryCharge = 60; // This is in rupees
  // Ensure we're calculating with numbers, not strings
  const subtotal = cart.reduce(
    (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity),
    0
  );
  console.log("Cart items:", cart);
  console.log("Subtotal calculated:", subtotal);

  const total = subtotal + deliveryCharge;
  console.log("Total with delivery charge:", total);

  const isFormValid =
    firstName &&
    lastName &&
    country &&
    address &&
    city &&
    state &&
    isValidPin &&
    isValidPhone &&
    cart.length > 0;
  // ADD A RAZORPAY TEST ROUTE

  const handleRazorpay = async () => {
    try {
      // Convert total to a proper number and multiply by 100 for paise
      const totalAsNumber = parseFloat(total);
      const amountInPaise = Math.round(totalAsNumber * 100);

      console.log(
        "Total amount:",
        totalAsNumber,
        "Sending amount to Razorpay (paise):",
        amountInPaise
      );

      const response = await fetch("https://herbsfox-1.onrender.com/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: "INR",
        }),
        credentials: "include", // Include cookies if needed
      });

      // Handle non-2xx responses
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error details:", errorData);
        throw new Error(
          `Payment initialization failed: ${
            errorData.error || errorData.message || response.statusText
          }`
        );
      }

      const order = await response.json();

      if (!order.success) {
        throw new Error(
          `Order creation failed: ${order.error || "Unknown error"}`
        );
      }

      console.log("Order received from server:", order);

      const options = {
        key: "rzp_test_bGB4J5qilz6M43",
        amount: order.amount,
        currency: order.currency,
        name: "Your Store",
        description: "Product Purchase",
        order_id: order.id,
        handler: async function (response) {
          const verifyRes = await fetch(
            "https://herbsfox-1.onrender.com/verify-payment",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            alert("Payment verified successfully! Order placed.");

            await fetch("https://herbsfox-1.onrender.com/save-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
               credentials: "include",
              body: JSON.stringify({
                firstName,
                lastName,
                country,
                address,
                city,
                state,
                pinCode,
                phone,
                paymentMethod: "online",
                totalAmount: total,
                items: cart,
                paymentStatus: "Paid",
              }),
            });

            localStorage.setItem("activeSection", "ORDERS");
            navigate("/my-account");
          } else {
            alert("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          contact: phone,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Error initializing payment:", err);
      alert(`Payment initialization failed: ${err.message}`);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    console.log("User at payment time:", storedUser); // DEBUG LOG

    if (!storedUser) {
      alert("Please log in to place an order.");
      navigate("/account");
      return;
    }

    if (!isFormValid) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (paymentMethod === "online") {
      handleRazorpay();
    } else {
      alert("Order placed with Cash on Delivery.");

      await fetch("https://herbsfox-1.onrender.com/save-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
        body: JSON.stringify({
          firstName,
          lastName,
          country,
          address,
          city,
          state,
          pinCode,
          phone,
          paymentMethod,
          totalAmount: total,
          items: cart,
          paymentStatus: "Pending",
        }),
      });

      localStorage.setItem("activeSection", "ORDERS");
      navigate("/my-account");
    }
  };
  return (
    <div>
      <h1 className="checkout-heading">Checkout</h1>

      {cart.length === 0 ? (
        <p className="empty-checkout">
          Your cart is empty. Add items before checking out.
        </p>
      ) : (
        <div className="checkout-container">
          <div className="checkout-left">
            <h2 className="shipping-address">Shipping Address</h2>
            <p className="checkout-content">
              Enter the address where you want your order delivered.
            </p>
            <form className="shipping-form" onSubmit={handlePayment}>
              <div className="form-row">
                <input
                  type="text"
                  placeholder="First Name"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="" disabled hidden>
                  Country
                </option>
                <option value="India">India</option>
              </select>

              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="" disabled hidden>
                  State
                </option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
                <option value="Delhi">Delhi</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Ladakh">Ladakh</option>
              </select>

              <div className="form-row">
                <input
                  type="text"
                  placeholder="Pin Code"
                  required
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                />
                <input
                  type="tel"
                  maxLength={10}
                  inputMode="numeric"
                  placeholder="Phone Number"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <h2 className="payment-options">Payment Options</h2>
              <div className="payment-options">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                  />
                  <span className="online-payment">Online Payment</span>
                </label>

                <label className="radio-label">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span className="cash-on-delivery">Cash on Delivery</span>
                </label>
              </div>

              <button
                type="submit"
                className="place-order-btn"
                disabled={!isFormValid}
              >
                Place Order
              </button>
            </form>
          </div>

          <div className="checkout-right">
            <h4 className="order-summary">Order Summary</h4>
            {cart.map((item, index) => (
              <div key={index} className="checkout-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <p>
                  {item.name} x {item.quantity}
                </p>
                <p>₹{item.price * item.quantity}</p>
              </div>
            ))}
            <hr className="order-summary-lines" />
            <p>Subtotal: ₹{subtotal}</p>
            <p>Delivery Charges: ₹{deliveryCharge}</p>
            <hr className="order-summary-lines" />
            <h3>Total: ₹{total}</h3>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
