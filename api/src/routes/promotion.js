import express from 'express';
import PromotionController from '../controllers/PromotionController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
import { productValidator } from '../utils/dataValidator.js';
import Promotion from '../models/Promotion.js'

const router = express.Router();

router.get('/type', PromotionController.getAllTypes)
router.get('/periods', PromotionController.getAllPeriods)
router.post('/create', verifyAdmin, PromotionController.create)


export default router