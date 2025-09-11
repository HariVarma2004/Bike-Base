import cors from "cors";
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bikeRouter from './routes/bikeRouter.js';
import authRouter from './routes/auth.js'; // Import auth routes

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use('/api/bikes', bikeRouter);
app.use('/api/auth', authRouter); // Add auth routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running successfully!' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});