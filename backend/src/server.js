
import cors from "cors";
import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import bikeRouter from './routes/bikeRouter.js';


const app = express();
dotenv.config();

app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));
app.use('/api/bikes', bikeRouter);



const PORT = process.env.PORT || 5000;


// middlewares

connectDB().then(app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}));


