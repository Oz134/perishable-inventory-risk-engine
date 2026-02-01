// backend/index.js

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET_KEY = "mysecret";

// ===== In-memory data =====
let users = [
  { username: "reshdeen", password: await bcrypt.hash("12345", 10) }
];

let products = [
  { id: 1, name: "Milk", quantity: 10, expiry: "2026-02-05" },
  { id: 2, name: "Bread", quantity: 5, expiry: "2026-02-02" }
];

// ====== HOME ROUTE ======
app.get("/", (req, res) => {
  res.send("Backend is running! Go to /products to see products.");
});

// ====== PRODUCT ROUTES ======

// Get all products
app.get("/products", (req, res) => {
  const today = new Date();
  const updatedProducts = products.map(p => {
    const expiryDate = new Date(p.expiry);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let risk = "Safe";
    if (diffDays <= 3) risk = "High";
    else if (diffDays <= 7) risk = "Medium";

    return { ...p, daysLeft: diffDays, risk };
  });

  res.json(updatedProducts);
});

// Add product
app.post("/products", (req, res) => {
  const { name, quantity, expiry } = req.body;
  if (!name || !quantity || !expiry)
    return res.status(400).json({ message: "All fields are required" });

  const id = products.length + 1;
  products.push({ id, name, quantity, expiry });
  res.json({ message: "Product added successfully" });
});

// ====== AUTH ROUTES ======

// Register
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: "Username and password are required" });

  const existingUser = users.find(u => u.username === username);
  if (existingUser)
    return res.status(400).json({ message: "Username already exists" });

  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: "User registered successfully" });
});

// Login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: "User not found" });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: "Incorrect password" });

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login success", token });
});

// ====== START SERVER ======
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
