const express = require("express");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const mysql = require("mysql2/promise");
const cors = require("cors");
const crypto = require("crypto");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(",") || [];
// const authenticateToken = require("./middleware/authenticateToken"); // adjust path if needed

app.use(cookieParser());

console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("RAZORPAY_SECRET:", process.env.RAZORPAY_SECRET);

app.use(express.json());
// This will help verify your Razorpay credentials

// (async () => {
//   const conn = await mysql.createConnection({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//   });
//   const hashed = await bcrypt.hash("mansi123", 10);

//   await conn.execute("UPDATE users SET password = ? WHERE email = ?", [
//     hashed,
//     "pathakmansi608@gmail.com",
//   ]);

//   console.log("Password hashed and updated!");
//   conn.end(); // Close connection after done
// })();

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// MySQL connection
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

app.post("/api/update-password", async (req, res) => {
  try {
    const hashed = await bcrypt.hash("mansi123", 10);

    await db.execute("UPDATE users SET password = ? WHERE email = ?", [
      hashed,
      "pathakmansi608@gmail.com",
    ]);

    res.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update failed:", error);
    res.status(500).json({ error: "Failed to update password" });
  }
});
// Initialize Razorpay with proper error handling
let razorpay;
try {
  // Check for environment variables
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_SECRET) {
    console.error("ERROR: Razorpay environment variables are missing!");
    console.error(
      "Please set RAZORPAY_KEY_ID and RAZORPAY_SECRET in your .env file"
    );

    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID, // Test key from your frontend
      key_secret: process.env.RAZORPAY_SECRET, // Replace with your actual test secret
    });
  } else {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    console.log(
      "Razorpay initialized with key ID:",
      process.env.RAZORPAY_KEY_ID
    );
  }

  // Verify Razorpay connection on startup
  (async () => {
    try {
      await razorpay.orders.all({ count: 1 });
      console.log("✅ Razorpay API connection verified successfully");
    } catch (error) {
      console.error("❌ Razorpay API connection failed: ", error.message);
      console.error("Please check your Razorpay credentials and try again");
    }
  })();
} catch (error) {
  console.error("Failed to initialize Razorpay:", error);
}
app.get("/test-razorpay", async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({
        success: false,
        error: "Razorpay not initialized",
      });
    }

    // Test with a minimal API call
    const testResult = await razorpay.orders.all({ count: 1 });

    return res.status(200).json({
      success: true,
      message: "Razorpay connection successful",
      keyId: razorpay.key_id,
      orders: testResult,
    });
  } catch (err) {
    console.error("Razorpay test failed:", err);

    return res.status(500).json({
      success: false,
      error: "Razorpay test failed",
      message: err.message,
      details: err,
    });
  }
});

(async () => {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.execute("SELECT 1 as test");
    console.log("✅ Connected to MySQL database");
    connection.release();
  } catch (err) {
    console.error("❌ Error connecting to MySQL:", err);
    console.error("Connection details:", {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
    });
  }
})();

app.get("/", (req, res) => {
  res.send("Hellllllllooooooooooo guyssssssszzzz");
});

app.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const [existing] = await db.execute("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.execute(
      "INSERT INTO users (name, phone, email, password, is_admin) VALUES (?, ?, ?, ?, ?)",
      [name, phone, email, hashedPassword, 0]
    );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
      sqlError: error.sqlMessage,
    });
  }
});

// Fixed login route in server.jsx
app.post("/login", async (req, res) => {
  try {
    const { nameOrEmail, password } = req.body;

    if (!nameOrEmail || !password) {
      return res
        .status(400)
        .json({ message: "Email or Username and password are required." });
    }

    // Optional: If the input includes '@', validate as email
    if (nameOrEmail.includes("@") && !isValidEmail(nameOrEmail)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    const [result] = await db.execute(
      "SELECT * FROM users WHERE email = ? OR name = ?",
      [nameOrEmail, nameOrEmail]
    );

    if (result.length === 0) {
      return res.status(400).json({ message: "User not found." });
    }

    const user = result[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password." });
    }

    // Generate JWT token (expires in 7 days)
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log("Generated Token:", token);

    // Send JWT as HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax",
    });

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        is_admin: user.is_admin, // 👈 this field must be included
      },
    });
  } catch (err) {
    console.error("Login error:", err.message, err.stack);
    return res.status(500).json({ message: "Server error during login." });
  }
});

const authenticateJWT = (req, res, next) => {
  let token = null;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("✅ JWT Decoded:", user); // 👈 Add this
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// New Route to Save Orders
app.post("/save-order", authenticateJWT, async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    address,
    city,
    state,
    pinCode,
    phone,
    paymentMethod, // "online" | "cod"
    totalAmount,
    items, // [{ product_id, name, price, quantity }]
  } = req.body;

  console.log("✅ Received order:", req.body);
  console.log("🔑 User from JWT:", req.user);

  if (
    !firstName ||
    !lastName ||
    !address ||
    !city ||
    !state ||
    !country ||
    !pinCode ||
    !phone ||
    !totalAmount ||
    !items?.length
  ) {
    console.log("❌ Missing fields in order body");
    return res.status(400).json({ message: "All order fields are required." });
  }

  const userId = req.user.id;
  const paymentStatus = paymentMethod === "online" ? "paid" : "pending";
  const deliveryStatus = "pending"; // ✅ Corrected

  let conn;

  try {
    conn = await db.getConnection();
    await conn.beginTransaction();

    // ✅ Insert order
    const [orderResult] = await conn.query(
      `INSERT INTO orders (user_id, first_name, last_name, address, city, state, country, pin_code, phone, payment_method, payment_status, delivery_status, total_amount, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        userId,
        firstName,
        lastName,
        address,
        city,
        state,
        country,
        pinCode,
        phone,
        paymentMethod,
        paymentStatus,
        "pending",
        totalAmount,
      ]
    );

    const orderId = orderResult.insertId;

    // ✅ Insert items
    const values = items.map((item) => [
      orderId,
      item.product_id,
      item.name,
      item.price,
      item.quantity,
    ]);

    await conn.query(
      `INSERT INTO order_items (order_id, product_id, name, price, quantity) VALUES ?`,
      [values]
    );

    await conn.commit();
    console.log("✅ Order saved successfully");
    res.status(200).json({ success: true, orderId });
  } catch (err) {
    if (conn) await conn.rollback();
    console.error("❌ Order saving failed:", err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    if (conn) conn.release();
  }
});

// Route to create Razorpay order

app.post("/create-order", async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;

    console.log("Received order request with data:", {
      amount,
      currency,
    });

    // Validate the amount is a valid number
    if (!amount || isNaN(amount) || amount <= 0) {
      console.error("Invalid amount provided:", amount);
      return res.status(400).json({
        success: false,
        error: "Invalid amount provided.",
      });
    }

    // Ensure amount is an integer (Razorpay requires amount in paise as integer)
    const amountInPaise = Math.round(Number(amount));

    console.log("Creating Razorpay order with amount (paise):", amountInPaise);

    // Create order options for Razorpay
    const options = {
      amount: amountInPaise,
      currency: currency,
      receipt: `receipt_${Date.now()}`,
      notes: {
        source: "Your Store",
      },
    };

    console.log("Sending to Razorpay API:", options);

    // Create Razorpay order with proper error handling
    try {
      const razorpayOrder = await razorpay.orders.create(options);

      console.log("Razorpay order created successfully:", {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
      });

      // Return full order details to client
      return res.status(200).json({
        success: true,
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      });
    } catch (razorpayError) {
      console.error("Razorpay API error:", {
        message: razorpayError.message,
        code: razorpayError.code,
        description: razorpayError.description,
      });

      return res.status(500).json({
        success: false,
        error: "Razorpay API error",
        details: razorpayError.message,
        description:
          razorpayError.description || "No additional details available",
      });
    }
  } catch (err) {
    console.error("Error in create-order endpoint:", err);
    return res.status(500).json({
      success: false,
      error: "Failed to process payment request",
      message: err.message,
    });
  }
});

app.post("/verify-payment", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  // Validate required fields
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({
      success: false,
      message: "Missing payment verification parameters.",
    });
  }

  const generated_signature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generated_signature === razorpay_signature) {
    return res
      .status(200)
      .json({ success: true, message: "Payment verified successfully." });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Payment verification failed." });
  }
});

// GET /orders/:userId - Fetch user's orders
app.get("/orders/:userId", authenticateJWT, async (req, res) => {
  const { userId } = req.params;

  // Ensure the requested userId matches the logged-in user's ID from the token
  console.log("👤 User from token:", req.user);

  if (Number(userId) !== req.user.id) {
    return res.status(403).json({ success: false, message: "Forbidden." });
  }

  try {
    // Get orders by user_id
    const [orders] = await db.execute(
      "SELECT id, first_name, last_name, total_amount, created_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    // Fetch items for each order
    for (const order of orders) {
      const [items] = await db.execute(
        "SELECT product_id, name, price, quantity FROM order_items WHERE order_id = ?",
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching user orders:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message,
    });
  }
});

// Save shipping address
app.post("/address/shipping", authenticateJWT, async (req, res) => {
  const {
    full_name,
    phone,
    email,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
  } = req.body;
  const user_id = req.user.id;

  if (
    !full_name ||
    !phone ||
    !email ||
    !address_line1 ||
    !city ||
    !state ||
    !postal_code ||
    !country
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const conn = await db.getConnection();
    await conn.query(
      `INSERT INTO shipping_addresses 
       (user_id, full_name, phone, email, address_line1, address_line2, city, state, postal_code, country)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        full_name,
        phone,
        email,
        address_line1,
        address_line2 || "",
        city,
        state,
        postal_code,
        country,
      ]
    );
    conn.release();

    res.status(200).json({ message: "Shipping address saved successfully." });
  } catch (error) {
    console.error("Error saving shipping address:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Fetch both billing and shipping addresses
app.get("/address/:userId", authenticateJWT, async (req, res) => {
  const userId = req.params.userId;

  try {
    const conn = await db.getConnection();
    const [billing] = await conn.query(
      "SELECT * FROM billing_addresses WHERE user_id = ?",
      [userId]
    );
    const [shipping] = await conn.query(
      "SELECT * FROM shipping_addresses WHERE user_id = ?",
      [userId]
    );
    conn.release();

    res
      .status(200)
      .json({ billing: billing[0] || null, shipping: shipping[0] || null });
  } catch (error) {
    console.error("Error fetching addresses:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
});

app.post("/address/billing", authenticateJWT, async (req, res) => {
  const {
    full_name,
    phone,
    email,
    address_line1,
    address_line2,
    city,
    state,
    postal_code,
    country,
  } = req.body;
  console.log("Received address:", req.body);
  // ✅ Log request body
  const user_id = req.user.id;

  console.log("User ID from token:", user_id);

  if (
    !full_name ||
    !phone ||
    !email ||
    !address_line1 ||
    !city ||
    !state ||
    !postal_code ||
    !country
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const conn = await db.getConnection();
    await conn.query(
      `INSERT INTO billing_addresses 
      (user_id, full_name, phone, email, address_line1, address_line2, city, state, postal_code, country)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        full_name,
        phone,
        email,
        address_line1,
        address_line2 || "",
        city,
        state,
        postal_code,
        country,
      ]
    );
    conn.release();

    res.status(200).json({ message: "Billing address saved successfully." });
  } catch (error) {
    console.error("Error saving billing address:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error.", error: error.message });
  }
});

// Route to handle contact form submission
app.post("/contact", async (req, res) => {
  const { name, email, subject, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER, // Your email
      pass: process.env.MAIL_PASS, // App password (not your email password)
    },
  });

  const mailOptions = {
    from: email,
    to: "pathakmansi608@gmail.com",
    subject: `Contact Form: ${subject}`,
    html: `
      <h3>New Message from Contact Form</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `,
  };

  try {
    // 📩 Send email
    await transporter.sendMail(mailOptions);

    // 💾 Save to MySQL
    await db.execute(
      `INSERT INTO contact_messages (name, email, subject, phone, message)
       VALUES (?, ?, ?, ?, ?)`,
      [name, email, subject, phone, message]
    );

    res.status(200).json({ message: "Message sent and saved successfully" });
  } catch (error) {
    console.error("Email or DB error:", error);
    res.status(500).json({ message: "Failed to send or save message" });
  }
});

// Account details section
// server.js (or routes/user.js)

// ✅ Update Account Details Endpoint (Option 1: without first_name/last_name)
app.put("/account/update", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const {
    displayName, // 👈 Will be saved as `name` in DB
    email,
    currentPassword,
    newPassword,
  } = req.body;

  try {
    // 🔍 Fetch user
    const [users] = await db.execute("SELECT * FROM users WHERE id = ?", [
      userId,
    ]);
    const user = users[0];
    if (!user) return res.status(404).json({ message: "User not found" });

    let hashedPassword = null;

    // 🔐 If changing password, validate old one
    if (newPassword) {
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        return res.status(400).json({ message: "Current password incorrect" });
      }
      hashedPassword = await bcrypt.hash(newPassword, 10);
    }

    // ✅ Update user (name, email, optionally password)
    await db.execute(
      `UPDATE users SET 
        name = ?, 
        email = ?, 
        password = COALESCE(?, password)
      WHERE id = ?`,
      [
        displayName || user.name, // Use displayName from form or keep existing name
        email,
        hashedPassword,
        userId,
      ]
    );

    res.json({ message: "Account updated successfully!" });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Failed to update account" });
  }
});

// For admin dashboard-----------------

app.get("/admin/orders", authenticateJWT, async (req, res) => {
  try {
    const [adminCheck] = await db.execute(
      "SELECT is_admin FROM users WHERE id = ?",
      [req.user.id]
    );

    if (!adminCheck[0]?.is_admin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const [orders] = await db.execute(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );

    for (let order of orders) {
      const [[user]] = await db.execute(
        "SELECT name, email FROM users WHERE id = ?",
        [order.user_id]
      );
      order.user_name = user?.name || "Unknown";
      order.user_email = user?.email || "Unknown";

      const [items] = await db.execute(
        "SELECT name AS product_name, quantity, price FROM order_items WHERE order_id = ?",
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, orders });
  } catch (err) {
    console.error("❌ Failed to fetch admin orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

app.put("/admin/orders/:orderId/status", authenticateJWT, async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  if (!["shipped", "arrived", "delivered"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  // Admin check
  const [adminCheck] = await db.execute(
    "SELECT is_admin FROM users WHERE id = ?",
    [req.user.id]
  );
  if (!adminCheck[0]?.is_admin) {
    return res.status(403).json({ message: "Access denied" });
  }

  if (status === "delivered") {
    // ✅ Update delivery date
    await db.execute(
      `UPDATE orders SET delivery_status = ?, delivered_at = NOW() WHERE id = ?`,
      [status, orderId]
    );

    // ✅ Fetch user email
    const [[order]] = await db.execute(
      `
      SELECT o.id, u.email, u.name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `,
      [orderId]
    );

    // ✅ Send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "pathakmansi0608@gmail.com",
        pass: "your-app-password", // 🔐 not your real password
      },
    });

    await transporter.sendMail({
      from: "pathakmansi0608@gmail.com",
      to: order.email,
      subject: "Your Order Has Been Delivered!",
      text: `Hi ${order.name},\n\nYour order #${order.id} has been delivered.\n\nThank you for shopping with us!\n\nTeam HerbsFox`,
    });

    return res.json({ success: true, message: "Order delivered & email sent" });
  }

  // For shipped or arrived
  await db.execute(`UPDATE orders SET delivery_status = ? WHERE id = ?`, [
    status,
    orderId,
  ]);
  res.json({ success: true, message: `Order marked as ${status}` });
});

app.get("/admin/users", authenticateJWT, async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, name, email, is_admin FROM users"
    );
    res.json({ users: rows });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all orders
// ✅ Route for regular logged-in users to fetch *their own* orders
app.get("/orders", authenticateJWT, async (req, res) => {
  try {
    const userId = req.user.id;

    const [orders] = await db.execute(
      "SELECT id, created_at, total_amount, payment_status, delivery_status, delivered_at FROM orders WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    for (let order of orders) {
      const [items] = await db.execute(
        "SELECT name, quantity FROM order_items WHERE order_id = ?",
        [order.id]
      );
      order.items = items;
    }

    res.json({ success: true, orders });
  } catch (err) {
    console.error("❌ Failed to fetch user orders:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Delete user
app.delete("/admin/users/:id", authenticateJWT, async (req, res) => {
  const [adminCheck] = await db.execute(
    "SELECT is_admin FROM users WHERE id = ?",
    [req.user.id]
  );
  if (!adminCheck[0]?.is_admin) {
    return res.status(403).json({ message: "Access denied" });
  }

  await db.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
  res.json({ success: true });
});

function isAdmin(req, res, next) {
  const user = req.user; // assume you decoded JWT or used session
  if (user && user.is_admin) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
}

// Make user an admin
app.put("/admin/users/:id/make-admin", authenticateJWT, async (req, res) => {
  const [adminCheck] = await db.execute(
    "SELECT is_admin FROM users WHERE id = ?",
    [req.user.id]
  );
  if (!adminCheck[0]?.is_admin) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    await db.execute("UPDATE users SET is_admin = 1 WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ success: true, message: "User promoted to admin." });
  } catch (err) {
    console.error("Error promoting user:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while promoting user." });
  }
});

// Revoke admin access
app.put("/admin/users/:id/revoke-admin", authenticateJWT, async (req, res) => {
  const [adminCheck] = await db.execute(
    "SELECT is_admin FROM users WHERE id = ?",
    [req.user.id]
  );
  if (!adminCheck[0]?.is_admin) {
    return res.status(403).json({ message: "Access denied" });
  }

  try {
    await db.execute("UPDATE users SET is_admin = 0 WHERE id = ?", [
      req.params.id,
    ]);
    res.json({ success: true, message: "Admin rights revoked." });
  } catch (err) {
    console.error("Error revoking admin:", err);
    res
      .status(500)
      .json({ success: false, message: "Server error while revoking admin." });
  }
});

// ✅ Update delivery status of an order (Admin Only)
app.put(
  "/admin/orders/:orderId/update-status",
  authenticateJWT,
  async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;

    try {
      // Check if current user is admin
      const [adminCheck] = await db.execute(
        "SELECT is_admin FROM users WHERE id = ?",
        [req.user.id]
      );
      if (!adminCheck[0]?.is_admin) {
        return res.status(403).json({ message: "Access denied. Admin only." });
      }

      // Update order delivery status
      const [result] = await db.execute(
        `UPDATE orders SET delivery_status = ?, delivered_at = ? WHERE id = ?`,
        [status, status === "delivered" ? new Date() : null, orderId]
      );

      res
        .status(200)
        .json({
          success: true,
          message: "Delivery status updated successfully.",
        });
    } catch (err) {
      console.error("Error updating delivery status:", err);
      res.status(500).json({ message: "Server error while updating status." });
    }
  }
);

// 🔒 Get all products (optionally filtered by category)
// Get all products
app.get("/products", async (req, res) => {
  try {
    let query = "SELECT * FROM products";
    const { category } = req.query;

    if (category) {
      query += " WHERE category = ?";
      const [products] = await db.execute(query, [category]);
      return res.json(products);
    }

    const [products] = await db.execute(query);
    res.json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Server error while fetching products" });
  }
});

app.get("/products/:slug", async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await db.execute("SELECT * FROM products WHERE slug = ?", [
      slug,
    ]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = rows[0];

    // ✅ Parse weight_price_map
    product.weight_price_map = product.weight_price_map
      ? JSON.parse(product.weight_price_map)
      : {};

    // ✅ Prepare sub_images array
    product.sub_images = [
      product.sub_image1,
      product.sub_image2,
      product.sub_image3,
    ].filter(Boolean); // avoid nulls

    delete product.sub_image1;
    delete product.sub_image2;
    delete product.sub_image3;

    res.json(product);
  } catch (err) {
    console.error("❌ Failed to fetch product:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Admin: Get all products
app.get("/admin/products", authenticateJWT, async (req, res) => {
  try {
    const [adminCheck] = await db.query(
      "SELECT is_admin FROM users WHERE id = ?",
      [req.user.id]
    );
    if (!adminCheck[0]?.is_admin) {
      return res.status(403).json({ message: "Access denied" });
    }

    const [products] = await db.query("SELECT * FROM products");
    res.json({ success: true, products });
  } catch (err) {
    console.error("❌ Error fetching admin products:", err);
    res
      .status(500)
      .json({ message: "Server error while fetching admin products" });
  }
});

app.post("/admin/products", authenticateJWT, async (req, res) => {
  const userId = req.user.id;
  const [adminCheck] = await db.execute(
    "SELECT is_admin FROM users WHERE id = ?",
    [userId]
  );
  if (!adminCheck[0]?.is_admin)
    return res.status(403).json({ message: "Not allowed" });

  const {
    name,
    slug,
    main_image,
    sub_image1,
    sub_image2,
    sub_image3,
    price_range,
    technical_name,
    about,
    sku,
    category,
    description,
    weight_price_map,
  } = req.body;

   // ✅ Debug log
  console.log("📥 Incoming product data:", req.body);

  try {
    await db.execute(
      `INSERT INTO products 
  (name, slug, main_image, sub_image1, sub_image2, sub_image3,
  price_range, technical_name, about, sku, category, description, weight_price_map)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE 
    name = VALUES(name),
    main_image = VALUES(main_image),
    sub_image1 = VALUES(sub_image1),
    sub_image2 = VALUES(sub_image2),
    sub_image3 = VALUES(sub_image3),
    price_range = VALUES(price_range),
    technical_name = VALUES(technical_name),
    about = VALUES(about),
    sku = VALUES(sku),
    category = VALUES(category),
    description = VALUES(description),
    weight_price_map = VALUES(weight_price_map)`,
      [
        name,
        slug,
        main_image,
        sub_image1,
        sub_image2,
        sub_image3,
        price_range,
        technical_name,
        about,
        sku,
        category,
        description,
        JSON.stringify(weight_price_map), // ✅ Convert to JSON string
      ]
    );
    res.json({ success: true, message: "Product added" });
  } catch (err) {
    console.error("❌ Product insert error:", err.message, err); // ✅ Log full error
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// In your backend routes file (probably routes/admin.js or similar)

// Update product route
app.put('/admin/products/:id',  authenticateJWT, async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      technical_name,
      main_image,
      sub_image1,
      sub_image2,
      sub_image3,
      price_range,
      about,
      sku,
      category,
      description,
      slug,
      weight_price_map
    } = req.body;

    // Update product in database
    const result = await db.query(
      `UPDATE products SET 
        name = ?, 
        technical_name = ?, 
        main_image = ?, 
        sub_image1 = ?, 
        sub_image2 = ?, 
        sub_image3 = ?, 
        price_range = ?, 
        about = ?, 
        sku = ?, 
        category = ?, 
        description = ?, 
        slug = ?, 
        weight_price_map = ?,
        
      WHERE id = ?`,
      [name, technical_name, main_image, sub_image1, sub_image2, sub_image3, 
       price_range, about, sku, category, description, slug, weight_price_map, productId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
