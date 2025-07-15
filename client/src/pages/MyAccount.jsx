import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressCard from "./AddressCard";
import BillingAddressForm from "./BillingAdressForm";
import ShippingAddressForm from "./ShippingAddressForm";
import AdminDashboard from "./AdminDashboard";

import { toast } from "react-toastify";

import Footer from "./Footer";
// const mysql = require("mysql2/promise");
import "./myaccounts.css";
import axios from "axios";

const MyAccount = () => {
  // --- state ---
  const [isAdmin, setIsAdmin] = useState(false); // ✅
  const [addresses, setAddresses] = useState({ billing: null, shipping: null });
  const [editing, setEditing] = useState({ billing: false, shipping: false });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};


  useEffect(() => {
    const fetchAddress = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId"); // Store this after login

      if (!userId) return;

      try {
        const response = await axios.get(
          `https://herbsfox.onrender.com/address/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("📦 Loaded address:", response.data);
        setAddress(response.data); // ✅ autofill
      } catch (error) {
        if (error.response?.status === 404) {
          console.log("📭 No address found, user must fill it");
        } else {
          console.error("❌ Failed to fetch address:", error);
        }
      }
    };

    fetchAddress();
  }, []);

  const saveBillingAddress = async (addressObj) => {
    console.log("🔍 addressObj before sending to backend:", addressObj);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://herbsfox.onrender.com/address/billing",
        {
          full_name: addressObj.name,
          phone: addressObj.phone || "0000000000",
          email: addressObj.email || "test@example.com",
          address_line1: addressObj.address,
          address_line2: addressObj.address_line2 || "",
          city: addressObj.city,
          state: addressObj.state,
          postal_code: addressObj.zip,
          country: addressObj.country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // on success
      setAddresses((prev) => ({ ...prev, billing: addressObj }));
      setEditing((prev) => ({ ...prev, billing: false }));

      toast.success("Billing address saved successfully!"); // ✅ Toast popup

      return response.data;
    } catch (error) {
      console.error("Error saving address:", error);
      console.error("Server reply:", error.response?.data); // 👈
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      } else {
        toast.error("Failed to save billing address.");
      }
      throw error;
    }
  };

  const saveShippingAddress = async (addressObj) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://herbsfox.onrender.com/address/shipping",
        {
          full_name: addressObj.name,
          phone: addressObj.phone || "0000000000",
          email: addressObj.email || "test@example.com",
          address_line1: addressObj.address,
          address_line2: addressObj.address_line2 || "",
          city: addressObj.city,
          state: addressObj.state,
          postal_code: addressObj.zip,
          country: addressObj.country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAddresses((prev) => ({ ...prev, shipping: addressObj }));
      setEditing((prev) => ({ ...prev, shipping: false }));
      toast.success("Shipping address saved successfully!");
    } catch (error) {
      toast.error("Failed to save shipping address.");
      console.error("Shipping error:", error);
    }
  };

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  // Login state
  const [loginData, setLoginData] = useState({
    nameOrEmail: "",
    password: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("DASHBOARD");

  // Registration state
  const [registerData, setRegisterData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const storedUserInfo = localStorage.getItem("userInfo");

  // Load saved login if "Remember Me" was checked
  useEffect(() => {
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    const savedName = localStorage.getItem("rememberedName");

    if (savedRememberMe) {
      setLoginData((prev) => ({ ...prev, nameOrEmail: savedName || "" }));
      setRememberMe(savedRememberMe);
    }
  }, []);

  useEffect(() => {
    const savedSection = localStorage.getItem("activeSection");
    if (savedSection) {
      setActiveSection(savedSection);
      localStorage.removeItem("activeSection");

      // If user is logged in and userInfo is loaded, fetch orders if ORDERS tab
      if (savedSection === "ORDERS" && isLoggedIn && userInfo) {
        fetchUserOrders(userInfo.id);
      }
    }
  }, [isLoggedIn, userInfo]);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";

    if (loggedInStatus) {
      setIsLoggedIn(true);
      const storedUserInfo = localStorage.getItem("userInfo");
      if (storedUserInfo) {
        const user = JSON.parse(storedUserInfo);
        setUserInfo(user);

        // ✅ Prefill account detail fields
        setFirstName(user.first_name || "");
        setLastName(user.last_name || "");
        setDisplayName(user.display_name || user.name || "");
        setEmail(user.email || "");
      }
    }
  }, []);

 useEffect(() => {
  if (activeSection === "ORDERS" && isLoggedIn && userInfo) {
    fetchUserOrders();
  }
}, [activeSection, isLoggedIn, userInfo]);

const fetchUserOrders = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  setLoadingOrders(true);
  try {
    const response = await axios.get("https://herbsfox.onrender.com/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    setOrders(response.data.orders || []);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    setOrders([]);
  } finally {
    setLoadingOrders(false);
  }
};


  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (storedUserInfo && loggedIn === "true") {
      const parsedUserInfo = JSON.parse(storedUserInfo);
      setUserInfo(parsedUserInfo);
      setIsLoggedIn(true);
      setLoginData({
        nameOrEmail: parsedUserInfo.email || "",
        password: "",
      });
      // ✅ Set admin status from stored user info
      if (parsedUserInfo.is_admin === 1) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  }, []);

  // Input change handlers
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setLoginError("");
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    setRegisterError("");
  };

  // Handle login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    if (!loginData.nameOrEmail || !loginData.password) {
      setLoginError("Both fields are required.");
      return;
    }
  // If input includes '@', treat it as an email and validate
  if (loginData.nameOrEmail.includes("@") && !isValidEmail(loginData.nameOrEmail)) {
    setLoginError("Please enter a valid email address.");
    return;
  }

    try {
      const response = await axios.post(
  "https://herbsfox.onrender.com/login",
  {
    nameOrEmail: loginData.nameOrEmail.trim(),
    password: loginData.password,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true, // ✅ This is important if backend uses cookies (yours does)
  }
);
     

      
      alert(response.data.message || "Login successful!");

      if (rememberMe) {
        localStorage.setItem("rememberedName", loginData.nameOrEmail);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedName");
        localStorage.removeItem("rememberMe");
      }

      console.log("Login Response:", response.data);

      setIsLoggedIn(true);
      localStorage.setItem("token", response.data.token); // ✅ Store JWT token
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("isLoggedIn", "true");
      setUserInfo(response.data.user);

      // After login success
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // const user = JSON.parse(localStorage.getItem("user"));
      // const savedUser = JSON.parse(localStorage.getItem("user"));

      if (response.data.user.is_admin === 1) {
        setIsAdmin(true); // ✅ Set admin state
      } else {
        setIsAdmin(false);
      }

      setLoginData({ nameOrEmail: "", password: "" });
      setActiveSection("DASHBOARD");
    } catch (error) {
      console.error(error.response?.data || error.message);
      setLoginError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  // Handle registration
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();


     if (!registerData.email || !isValidEmail(registerData.email)) {
    setRegisterError("Please enter a valid email address.");
    return;
  }
  
    try {
      const response = await axios.post("https://herbsfox.onrender.com/register", {
        name: registerData.name,
        phone: registerData.phone,
        email: registerData.email,
        password: registerData.password,
      });

      alert(response.data.message);
      setRegisterData({ name: "", phone: "", email: "", password: "" });
    } catch (error) {
      const serverError = error.response?.data;
      const errorMsg =
        serverError?.error ||
        serverError?.sqlError ||
        serverError?.message ||
        "Registration failed.";

      console.error("Registration error:", errorMsg);
      setRegisterError(errorMsg);
    }
  };

  // Render dashboard tabs
  const renderDashboardContent = () => {
    switch (activeSection) {
      case "DASHBOARD":
        return (
          <div className="dashboard-content">
            (not <strong>{userInfo?.name || userInfo?.email}</strong>?{" "}
            <button
              className="logout-dashboard-button"
              onClick={() => {
                const confirmLogout = window.confirm(
                  "Are you sure you want to logout?"
                );
                if (confirmLogout) {
                  setIsLoggedIn(false);
                  setLoginData({ nameOrEmail: "", password: "" });
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("userInfo");
                  setUserInfo(null);
                  setActiveSection("DASHBOARD");
                }
              }}
            >
              Log out
            </button>
            )<br />
            From your account dashboard you can view your recent orders, manage
            your shipping and billing addresses, and edit your password and
            account details.
            <br />
            Verification status: <strong>Verified</strong>.
          </div>
        );
      case "ORDERS":
        return (
          <div className="order-section-dashboard">
            {loadingOrders ? (
              <p>Loading orders...</p>
            ) : orders.length === 0 ? (
              <div className="orders-empty">
                <p className="order-content">No order placed yet.</p>
                <button
                  className="browse-products-button"
                  onClick={() => navigate("/shop")}
                >
                  BROWSE PRODUCTS
                </button>
              </div>
            ) : (
              <div className="orders-list">
                {orders.map((order) => (
                  <div key={order.id} className="order-card">
                    <p>
                      <strong>Order ID:</strong> {order.id}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      {order.payment_status === "paid"
                        ? "✅ Paid"
                        : "🕒 Pending"}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹{order.total_amount}
                    </p>

                    {/* Order Items */}
                    {order.items && order.items.length > 0 && (
                      <ul className="order-items">
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            🛍️ {item.name} — Qty: {item.quantity}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Delivery Status */}
                    {order.delivery_status === "delivered" &&
                    order.delivered_at ? (
                      <div className="delivered-message">
                        <p className="success-text">
                          ✅{" "}
                          <strong>
                            Your order was delivered on{" "}
                            {new Date(order.delivered_at).toLocaleDateString()}.
                          </strong>
                        </p>
                      </div>
                    ) : (
                      <p>
                        <strong>Delivery Status:</strong>{" "}
                        {order.delivery_status === "shipped"
                          ? "🚚 Shipped"
                          : order.delivery_status === "arrived"
                          ? "📦 Arrived"
                          : "⌛ Pending"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "ADDRESSES":
        return (
          <>
            {/* Show address cards only if no form is being edited */}
            {!editing.billing && !editing.shipping && (
              <div className="addresses-wrapper">
                <AddressCard
                  title="BILLING ADDRESS"
                  address={addresses.billing}
                  onEdit={() => setEditing({ billing: true, shipping: false })}
                />
                <AddressCard
                  title="SHIPPING ADDRESS"
                  address={addresses.shipping}
                  onEdit={() => setEditing({ billing: false, shipping: true })}
                />
              </div>
            )}

            {/* Show Billing form full width */}
            {editing.billing && (
              <BillingAddressForm
                initial={addresses.billing}
                onSave={saveBillingAddress}
                onCancel={() => setEditing({ billing: false, shipping: false })}
              />
            )}

            {/* Show Shipping form full width */}
            {editing.shipping && (
              <ShippingAddressForm
                initial={addresses.shipping}
                onSave={saveShippingAddress}
                onCancel={() => setEditing({ billing: false, shipping: false })}
              />
            )}
          </>
        );

      case "ACCOUNT DETAILS":
        return (
          <div className="account-details-form">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const token = localStorage.getItem("token");
                  const res = await axios.put(
                    "https://herbsfox.onrender.com/account/update",
                    {
                      firstName,
                      lastName,
                      displayName,
                      email,
                      currentPassword,
                      newPassword,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  toast.success(res.data.message);
                  setCurrentPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                } catch (err) {
                  toast.error(
                    err.response?.data?.message || "Failed to update"
                  );
                }
              }}
            >
              <label>First name *</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />

              <label>Last name *</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />

              <label>Display name *</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
              <p className="display-note">
                This will be how your name will be displayed in the account
                section and in reviews
              </p>

              <label>Email address *</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <h4>Password change</h4>

              <label>Current password (leave blank to leave unchanged)</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <label>New password (leave blank to leave unchanged)</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <label>Confirm new password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button type="submit" className="save-changes-button">
                Save Changes
              </button>
            </form>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <h1 className="myaccount-heading">My Account</h1>
      {isLoggedIn ? (
        isAdmin ? (
          <AdminDashboard
            userInfo={userInfo}
            setIsLoggedIn={setIsLoggedIn}
            setLoginData={setLoginData}
            setUserInfo={setUserInfo}
          />
        ) : (
          <div className="dashboard-container">
            <div className="sidebar">
              {[
                "DASHBOARD",
                "ORDERS",
                "ADDRESSES",
                "ACCOUNT DETAILS",
                "LOGOUT",
              ].map((item) => (
                <button
                  key={item}
                  className={`sidebar-button ${
                    activeSection === item ? "active" : ""
                  }`}
                  onClick={() => {
                    if (item === "LOGOUT") {
                      const confirmLogout = window.confirm(
                        "Are you sure you want to logout?"
                      );
                      if (confirmLogout) {
                        setIsLoggedIn(false);
                        setLoginData({ nameOrEmail: "", password: "" });
                        localStorage.removeItem("isLoggedIn"); // 👈
                        localStorage.removeItem("userInfo");
                        setUserInfo(null);
                        setActiveSection("DASHBOARD");
                      }
                    } else {
                      setActiveSection(item);
                    }
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="content">
              <h2>Welcome, {userInfo?.name || userInfo?.email}!</h2>
              {renderDashboardContent()}
            </div>
          </div>
        )
      ) : (
        <div className="myaccountsection">
          {/* Login Form */}
          <div className="leftsection2">
            <h4 className="login">Login</h4>
            {loginError && <p style={{ color: "red" }}>{loginError}</p>}
            <form onSubmit={handleLoginSubmit}>
              <div>
                <label>E-mail Address*</label>
                <br />
                <input
                  id="name1"
                  type="text"
                  name="nameOrEmail"
                  value={loginData.nameOrEmail}
                  placeholder="Enter your e-mail address"
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <br />
              <div>
                <label>Password*</label>
                <br />
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  placeholder="Enter your password"
                  onChange={handleLoginChange}
                  required
                />
              </div>
              <br />
              <div className="checkbox-container">
                <input
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember">Remember Me</label>
              </div>
              <br />
              <button className="login-button" type="submit">
                Log in
              </button>
            </form>
          </div>

          {/* Registration Form */}
          <div className="rightsection2">
            <h4 className="register">Register</h4>
            {registerError && <p style={{ color: "red" }}>{registerError}</p>}
            <form onSubmit={handleRegisterSubmit}>
              <div>
                <label>Name*</label>
                <br />
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={registerData.name}
                  placeholder="Enter your name"
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <br />
              <div>
                <label>Phone*</label>
                <br />
                <input
                  id="register-phone"
                  type="text"
                  name="phone"
                  value={registerData.phone}
                  placeholder="Enter your phone number"
                  maxLength={10}
                  inputMode="numeric"
                  pattern="\d{10}"
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d{0,10}$/.test(value)) {
                      setRegisterData({ ...registerData, phone: value });
                    }
                  }}
                  required
                />
              </div>
              <br />
              <div>
                <label>Email*</label>
                <br />
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={registerData.email}
                  placeholder="Enter your email"
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <br />
              <div>
                <label>Password*</label>
                <br />
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  value={registerData.password}
                  placeholder="Enter your password"
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <br />
              <button className="register-button" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyAccount;
