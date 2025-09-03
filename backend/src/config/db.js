import mongoose from "mongoose";
import dotenv from "dotenv";

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MONGODB  is connect successfully");
    } catch (error) {
        console.error("MONGODB Failure : " , error);
    }
}

