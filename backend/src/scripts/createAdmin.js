// scripts/createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdminAccount = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@bikebase.com" });
    if (existingAdmin) {
      console.log("Admin account already exists");
      process.exit(0);
    }
    
    // Create admin account
    const hashedPassword = await bcrypt.hash("admin123", 10);
    const adminUser = new User({
      name: "BikeBase Admin",
      email: "admin@bikebase.com",
      password: hashedPassword,
      role: "admin"
    });
    
    await adminUser.save();
    console.log("Admin account created successfully!");
    console.log("Email: admin@bikebase.com");
    console.log("Password: admin123");
    
    process.exit(0);
  } catch (error) {
    console.error("Error creating admin account:", error);
    process.exit(1);
  }
};

createAdminAccount();