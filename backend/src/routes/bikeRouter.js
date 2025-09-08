import express from 'express';
import { getAllBikes , getBikeById ,createBike ,updateBike ,deleteBike } from '../controllers/bikesController.js';


const router = express.Router();

router.get('/', getAllBikes);
router.get('/:id', getBikeById);
router.post('/', createBike);
router.put('/:id', updateBike);
router.delete('/:id', deleteBike);

export default router;
