const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper: check production mode
const isProd = process.env.NODE_ENV === "production";

// POST: Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed });
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

// POST: Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProd,            // ✅ Only send over HTTPS in production
      sameSite: isProd ? "None" : "Lax", // ✅ Allow cross-site cookies in production
      maxAge: 7 * 24 * 60 * 60 * 1000,   // ✅ 7 days
    });

    res.json({
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// POST: Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "None" : "Lax",
  });

  res.json({ message: "Logged out successfully" });
});

module.exports = router;
