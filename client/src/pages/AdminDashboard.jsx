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
      const res = await axios.get("https://herbsfox-1.onrender.com/admin/products", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
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
      await axios.post("https://herbsfox-1.onrender.com/admin/products", newProduct, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
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
      const res = await axios.get("https://herbsfox-1.onrender.com/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setOrders(res.data.orders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://herbsfox-1.onrender.com/admin/orders/${orderId}/status`,
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
      const res = await axios.get("https://herbsfox-1.onrender.com/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setUsers(res.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://herbsfox-1.onrender.com/admin/users/${id}`, {
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
        `https://herbsfox-1.onrender.com/admin/users/${id}/make-admin`,
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
        `https://herbsfox-1.onrender.com/admin/users/${id}/revoke-admin`,
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
          <div>
            <h3>Product Management</h3>
            <p>Product management section will go here.</p>
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

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./AdminDashboard.css";

// const AdminDashboard = ({
//   userInfo,
//   setIsLoggedIn,
//   setLoginData,
//   setUserInfo,
// }) => {
//   const [activeSection, setActiveSection] = useState("MANAGE_USERS");
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();
//   const [orders, setOrders] = useState([]);
//   const [fetchedProducts, setFetchedProducts] = useState([]);

//   useEffect(() => {
//     if (activeSection === "MANAGE_USERS") {
//       fetchUsers();
//     }
//   }, [activeSection]);

//   useEffect(() => {
//     if (activeSection === "MANAGE_ORDERS") {
//       fetchOrders();
//     }
//   }, [activeSection]);

//   useEffect(() => {
//   if (activeSection === "MANAGE_PRODUCTS") {
//     fetchAdminProducts();
//   }
// }, [activeSection]);

// const fetchAdminProducts = async () => {
//   try {
//     const token = localStorage.getItem("token");
//     const res = await axios.get("https://herbsfox-1.onrender.com/admin/products", {
//       headers: { Authorization: `Bearer ${token}` },
//       withCredentials: true,
//     });
//     setFetchedProducts(res.data.products);
//   } catch (err) {
//     console.error("Error fetching admin products:", err);
//   }
// };

//   const fetchOrders = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("https://herbsfox-1.onrender.com/admin/orders", {
//         headers: { Authorization: `Bearer ${token}` },
//         withCredentials: true,
//       });
//       setOrders(res.data.orders);
//     } catch (err) {
//       console.error("Failed to fetch orders:", err);
//     }
//   };

//   const handleStatusUpdate = async (orderId, newStatus) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://herbsfox-1.onrender.com/admin/orders/${orderId}/status`, // ← fixed
//         { status: newStatus.toLowerCase() },
//         { headers: { Authorization: `Bearer ${token}` }, withCredentials: true }
//       );

//       // refresh list
//       fetchOrders();
//     } catch (err) {
//       console.error("Error updating status:", err);
//       alert(err.response?.data?.message || "Failed to update status.");
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.get("https://herbsfox-1.onrender.com/admin/users", {
//         headers: {
//           Authorization: `Bearer ${token}`, // ✅ attach the token!
//         },
//         withCredentials: true,
//       });
//       if (process.env.NODE_ENV === "development") {
//         console.log("Fetched users:", res.data.users);
//       }

//       setUsers(res.data.users);
//     } catch (err) {
//       console.error("Failed to fetch users:", err);
//     }
//   };

//   const deleteUser = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this user?")) return;
//     try {
//       const token = localStorage.getItem("token");
//       await axios.delete(`https://herbsfox-1.onrender.com/admin/users/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         withCredentials: true,
//       });
//       fetchUsers(); // refresh
//     } catch (err) {
//       console.error("Failed to delete user:", err);
//     }
//   };

//   const makeAdmin = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://herbsfox-1.onrender.com/admin/users/${id}/make-admin`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       fetchUsers(); // Refresh list
//     } catch (err) {
//       console.error("Failed to make admin:", err);
//     }
//   };

//   const revokeAdmin = async (id) => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `https://herbsfox-1.onrender.com/admin/users/${id}/revoke-admin`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       fetchUsers(); // Refresh list
//     } catch (err) {
//       console.error("Failed to revoke admin:", err);
//     }
//   };

//   const handleLogout = () => {
//     const confirmLogout = window.confirm("Are you sure you want to logout?");
//     if (confirmLogout) {
//       setIsLoggedIn(false);
//       setLoginData({ nameOrEmail: "", password: "" });
//       localStorage.removeItem("isLoggedIn");
//       localStorage.removeItem("userInfo");
//       setUserInfo(null);
//       navigate("/my-account");
//     }
//   };

//   // Filter users by search term
//   const filteredUsers = users.filter(
//     (user) =>
//       user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="admin-dashboard">
//       <h2>Welcome Admin, {userInfo?.name}</h2>

//       <div className="admin-nav">
//         <button onClick={() => setActiveSection("MANAGE_USERS")}>
//           Manage Users
//         </button>
//         <button onClick={() => setActiveSection("MANAGE_ORDERS")}>
//           Manage Orders
//         </button>
//         <button onClick={() => setActiveSection("MANAGE_PRODUCTS")}>
//           Manage Products
//         </button>
//         <button onClick={handleLogout} className="admin-logout-button">
//           Logout
//         </button>
//       </div>

//       <div className="admin-section">
//         {activeSection === "MANAGE_USERS" && (
//           <>
//             <h3>User Management</h3>

//             <input
//               type="text"
//               placeholder="Search users by name or email..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="admin-search"
//             />

//             <ul className="admin-user-list">
//               {filteredUsers.length === 0 ? (
//                 <li>No matching users found.</li>
//               ) : (
//                 filteredUsers.map((user) => (
//                   <li key={user.id} className="admin-user-card">
//                     <div>
//                       <strong>{user.name}</strong> ({user.email}) -{" "}
//                       {user.is_admin ? "Admin" : "User"}
//                     </div>
//                     <div className="user-action-buttons">
//                       {user.is_admin ? null : (
//                         <button
//                           className="admin-btn admin-btn-promote"
//                           onClick={() => makeAdmin(user.id)}
//                         >
//                           Make Admin
//                         </button>
//                       )}

//                       {user.is_admin && user.id !== userInfo?.id && (
//                         <button
//                           className="admin-btn admin-btn-demote"
//                           onClick={() => revokeAdmin(user.id)}
//                         >
//                           Revoke Admin
//                         </button>
//                       )}

//                       <button
//                         className="admin-btn admin-btn-delete"
//                         onClick={() => deleteUser(user.id)}
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </li>
//                 ))
//               )}
//             </ul>
//           </>
//         )}

//         {activeSection === "MANAGE_ORDERS" && (
//           <div className="order-management-section">
//             <h3>🧾 Order Management</h3>
//             {orders.length === 0 ? (
//               <p>No orders placed yet.</p>
//             ) : (
//               orders.map((order) => (
//                 <div key={order.id} className="admin-order-card">
//                   <div className="order-header">
//                     <h4>Order #{order.id}</h4>
//                     <p>
//                       <strong>Placed by:</strong> {order.user_name || "Unknown"}{" "}
//                       ({order.user_email || "N/A"})
//                     </p>
//                     <p>
//                       <strong>Total Amount:</strong> ₹{order.total_amount}
//                     </p>
//                     <p>
//                       <strong>Ordered On:</strong>{" "}
//                       {new Date(order.created_at).toLocaleString()}
//                     </p>
//                   </div>

//                   <div className="order-items">
//                     <h5>🛒 Items:</h5>
//                     {Array.isArray(order.items) && order.items.length > 0 ? (
//                       <ul>
//                         {order.items.map((item, index) => (
//                           <li key={item.product_id || index}>
//                             {item.product_name} × {item.quantity} — ₹
//                             {item.price}
//                           </li>
//                         ))}
//                       </ul>
//                     ) : (
//                       <p>No items found for this order.</p>
//                     )}
//                   </div>

//                   <div className="order-status">
//                     <label>
//                       <strong>Delivery Status:</strong>
//                     </label>
//                     <select
//                       value={order.delivery_status?.toLowerCase() || "pending"}
//                       onChange={(e) =>
//                         handleStatusUpdate(order.id, e.target.value)
//                       }
//                     >
//                       <option value="pending">Pending</option>
//                       <option value="shipped">Shipped</option>
//                       <option value="arrived">Arrived</option>
//                       <option value="delivered">Delivered</option>
//                     </select>

//                     {order.delivery_status === "delivered" &&
//                       order.delivered_at && (
//                         <p className="delivered-note">
//                           ✅ Delivered on:{" "}
//                           {new Date(order.delivered_at).toLocaleDateString()}
//                         </p>
//                       )}
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>
//         )}

//         {activeSection === "MANAGE_PRODUCTS" && (
//           <div className="manage-products-section">
//             <h3>📦 Manage Products</h3>
//             {fetchedProducts.length === 0 ? (
//               <p>No products found.</p>
//             ) : (
//               <ul className="product-list">
//                 {fetchedProducts.map((product) => (
//                   <li key={product.id} className="product-card">
//                     <img
//                       src={product.main_image}
//                       alt={product.name}
//                       className="product-thumbnail"
//                     />
//                     <div className="product-info">
//                       <h4>{product.name}</h4>
//                       <p>
//                         <strong>Category:</strong> {product.category}
//                       </p>
//                       <p>
//                         <strong>Price Range:</strong> {product.price_range}
//                       </p>
//                       <p>
//                         <strong>SKU:</strong> {product.sku}
//                       </p>
//                     </div>
//                     <div className="product-actions">
//                       <button>Edit</button>
//                       <button>Delete</button>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
