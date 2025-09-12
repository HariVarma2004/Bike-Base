import cors from "cors";
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bikeRouter from './routes/bikeRouter.js';
import authRouter from './routes/auth.js'; 
import userRouter from './routes/userRouter.js'; // Import user routes

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors({ origin: "https://bike-base-frontend.onrender.com/" }));
// app.use(cors({ origin: "http://localhost:5173" }));


// Routes
app.use('/api/bikes', bikeRouter);
app.use('/api/auth', authRouter); 
app.use('/api/users', userRouter); // Add user routes

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
