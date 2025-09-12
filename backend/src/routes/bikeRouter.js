import express from "express";
import {
    getAllBikes,
    getBikeById,
    createBike,
    updateBike,
    deleteBike,
    searchBikes,
} from "../controllers/bikesController.js";

const router = express.Router();

// --- Existing CRUD ---
router.get("/", getAllBikes);
router.get('/search', searchBikes); 
router.get("/:id", getBikeById);
router.post("/", createBike);
router.put("/:id", updateBike);
router.delete("/:id", deleteBike);



export default router;
