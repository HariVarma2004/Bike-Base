// routes/auth.js - FIXED
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const router = express.Router();

// Register - FIXED: Remove manual password hashing
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please provide all required fields" });
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }
    
    // Create new user - let the User model handle password hashing
    const user = new User({ 
      name, 
      email, 
      password, // Pass plain password - model will hash it
      role: role || "user"
    });
    
    await user.save(); // Pre-save hook will hash the password
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    res.status(201).json({ 
      message: "User registered successfully",
      token,
      role: user.role,
      name: user.name
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// Login - Keep as is with debugging
router.post("/login", async (req, res) => {
  try {
    console.log("=== LOGIN ATTEMPT ===");
    console.log("Request body:", req.body);
    
    const { email, password } = req.body;

    // 1. Find the user
    const user = await User.findOne({ email });
    console.log("User found:", user ? user.email : "None");
    
    if (!user) {
      console.log("❌ No user found with email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 2. Debug password comparison
    console.log("Provided password:", password);
    console.log("Stored password hash:", user.password);
    
    // 3. Compare passwords
    const isMatch = await user.comparePassword(password);
    console.log("Password match result:", isMatch);
    
    if (!isMatch) {
      console.log("❌ Password comparison failed");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // 4. Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "1d" }
    );

    console.log("✅ Login successful, token generated");
    res.json({ token, role: user.role, name: user.name, message: "Login successful" });

  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

  // TEMPORARY ROUTE - Add to auth.js
router.post('/create-admin', async (req, res) => {
  try {
    const admin = new User({
      name: "Super Admin",
      email: "admin@bikebase.com",
      password: "admin123", // Will be auto-hashed by your pre-save hook
      role: "admin"
    });
    await admin.save();
    res.json({ message: "Admin created successfully", email: admin.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;