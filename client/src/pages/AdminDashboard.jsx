import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = ({
  userInfo,
  setIsLoggedIn,
  setLoginData,
  setUserInfo,
}) => {
  const [activeSection, setActiveSection] = useState("MANAGE_USERS");
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    technical_name: "",
    main_image: "",
    sub_image1: "",
    sub_image2: "",
    sub_image3: "",
    price_range: "",
    about: "",
    sku: "",
    category: "",
    description: "",
  });

  useEffect(() => {
    if (activeSection === "MANAGE_USERS") {
      fetchUsers();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "MANAGE_ORDERS") {
      fetchOrders();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "MANAGE_PRODUCTS") {
      fetchAdminProducts();
    }
  }, [activeSection]);

  const fetchAdminProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://herbsfox.onrender.com/admin/products",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setFetchedProducts(res.data.products);
    } catch (err) {
      console.error("Error fetching admin products:", err);
    }
  };

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://herbsfox.onrender.com/admin/products",
        newProduct,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      alert("Product added successfully!");
      setNewProduct({
        name: "",
        technical_name: "",
        main_image: "",
        sub_image1: "",
        sub_image2: "",
        sub_image3: "",
        price_range: "",
        about: "",
        sku: "",
        category: "",
        description: "",
      });
      fetchAdminProducts();
    } catch (err) {
      console.error("Failed to add product:", err);
      alert("Error adding product.");
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://herbsfox.onrender.com/admin/orders",
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://herbsfox.onrender.com/admin/orders/${orderId}/status`,
        { status: newStatus.toLowerCase() },
        { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
      );
      fetchOrders();
    } catch (err) {
      console.error("Error updating status:", err);
      alert(err.response?.data?.message || "Failed to update status.");
    }
  };

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "https://herbsfox.onrender.com/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://herbsfox.onrender.com/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const makeAdmin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://herbsfox.onrender.com/admin/users/${id}/make-admin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      fetchUsers();
    } catch (err) {
      console.error("Failed to make admin:", err);
    }
  };

  const revokeAdmin = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://herbsfox.onrender.com/admin/users/${id}/revoke-admin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      fetchUsers();
    } catch (err) {
      console.error("Failed to revoke admin:", err);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      setIsLoggedIn(false);
      setLoginData({ nameOrEmail: "", password: "" });
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userInfo");
      setUserInfo(null);
      navigate("/my-account");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-dashboard">
      <h2>Welcome Admin, {userInfo?.name}</h2>

      <div className="admin-nav">
        <button onClick={() => setActiveSection("MANAGE_USERS")}>
          Manage Users
        </button>
        <button onClick={() => setActiveSection("MANAGE_ORDERS")}>
          Manage Orders
        </button>
        <button onClick={() => setActiveSection("MANAGE_PRODUCTS")}>
          Manage Products
        </button>
        <button onClick={handleLogout} className="admin-logout-button">
          Logout
        </button>
      </div>

      <div className="admin-section">
        {activeSection === "MANAGE_USERS" && (
          <>
            <h3>User Management</h3>

            <input
              type="text"
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="admin-search"
            />

            <ul className="admin-user-list">
              {filteredUsers.length === 0 ? (
                <li>No matching users found.</li>
              ) : (
                filteredUsers.map((user) => (
                  <li key={user.id} className="admin-user-card">
                    <div>
                      <strong>{user.name}</strong> ({user.email}) -{" "}
                      {user.is_admin ? "Admin" : "User"}
                    </div>
                    <div className="user-action-buttons">
                      {user.is_admin ? null : (
                        <button
                          className="admin-btn admin-btn-promote"
                          onClick={() => makeAdmin(user.id)}
                        >
                          Make Admin
                        </button>
                      )}

                      {user.is_admin && user.id !== userInfo?.id && (
                        <button
                          className="admin-btn admin-btn-demote"
                          onClick={() => revokeAdmin(user.id)}
                        >
                          Revoke Admin
                        </button>
                      )}

                      <button
                        className="admin-btn admin-btn-delete"
                        onClick={() => deleteUser(user.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </>
        )}
        {activeSection === "MANAGE_PRODUCTS" && (
          <div className="product-management-section">
            <h3>Product Management</h3>
            <form onSubmit={handleAddProduct} className="product-form">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleProductInputChange}
                placeholder="Product Name"
                required
              />
              <input
                type="text"
                name="slug"
                value={newProduct.slug}
                onChange={handleProductInputChange}
                placeholder="Slug (unique URL part)"
                required
              />
              <input
                type="text"
                name="main_image"
                value={newProduct.main_image}
                onChange={handleProductInputChange}
                placeholder="Main Image URL"
                required
              />
              <input
                type="text"
                name="sub_image1"
                value={newProduct.sub_image1}
                onChange={handleProductInputChange}
                placeholder="Sub Image 1 URL"
              />
              <input
                type="text"
                name="sub_image2"
                value={newProduct.sub_image2}
                onChange={handleProductInputChange}
                placeholder="Sub Image 2 URL"
              />
              <input
                type="text"
                name="sub_image3"
                value={newProduct.sub_image3}
                onChange={handleProductInputChange}
                placeholder="Sub Image 3 URL"
              />
              <input
                type="text"
                name="price_range"
                value={newProduct.price_range}
                onChange={handleProductInputChange}
                placeholder="Price Range (e.g. ₹250 - ₹500)"
                required
              />
              <input
                type="text"
                name="technical_name"
                value={newProduct.technical_name}
                onChange={handleProductInputChange}
                placeholder="Technical Name"
              />
              <input
                type="text"
                name="about"
                value={newProduct.about}
                onChange={handleProductInputChange}
                placeholder="About Product (short)"
              />
              <input
                type="text"
                name="sku"
                value={newProduct.sku}
                onChange={handleProductInputChange}
                placeholder="SKU Code"
              />
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleProductInputChange}
                placeholder="Category (e.g. herbs, seeds, pooja, spices)"
                required
              />
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleProductInputChange}
                placeholder="Full Description"
                rows={4}
              />
              <button type="submit" className="admin-btn admin-btn-promote">
                Add Product
              </button>
            </form>

            <hr />

            <h4>All Products:</h4>
            <div className="product-grid">
              {fetchedProducts.length === 0 ? (
                <p>No products added yet.</p>
              ) : (
                fetchedProducts.map((prod) => (
                  <div key={prod.id} className="admin-product-card">
                    <img
                      src={prod.main_image}
                      alt={prod.name}
                      className="product-thumb"
                    />
                    <p>
                      <strong>{prod.name}</strong>
                    </p>
                    <p>{prod.category}</p>
                    <p>{prod.price_range}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {activeSection === "MANAGE_ORDERS" && (
          <div className="order-management-section">
            <h3>🧾 Order Management</h3>
            {orders.length === 0 ? (
              <p>No orders placed yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="admin-order-card">
                  <div className="order-header">
                    <h4>Order #{order.id}</h4>
                    <p>
                      <strong>Placed by:</strong> {order.user_name || "Unknown"}{" "}
                      ({order.user_email || "N/A"})
                    </p>
                    <p>
                      <strong>Total Amount:</strong> ₹{order.total_amount}
                    </p>
                    <p>
                      <strong>Ordered On:</strong>{" "}
                      {new Date(order.created_at).toLocaleString()}
                    </p>
                  </div>

                  <div className="order-items">
                    <h5>🛒 Items:</h5>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      <ul>
                        {order.items.map((item, index) => (
                          <li key={item.product_id || index}>
                            {item.product_name} × {item.quantity} — ₹
                            {item.price}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No items found for this order.</p>
                    )}
                  </div>

                  <div className="order-status">
                    <label>
                      <strong>Delivery Status:</strong>
                    </label>
                    <select
                      value={order.delivery_status?.toLowerCase() || "pending"}
                      onChange={(e) =>
                        handleStatusUpdate(order.id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="shipped">Shipped</option>
                      <option value="arrived">Arrived</option>
                      <option value="delivered">Delivered</option>
                    </select>

                    {order.delivery_status === "delivered" &&
                      order.delivered_at && (
                        <p className="delivered-note">
                          ✅ Delivered on:{" "}
                          {new Date(order.delivered_at).toLocaleDateString()}
                        </p>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
