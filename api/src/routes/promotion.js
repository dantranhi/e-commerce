import express from 'express';
import PromotionController from '../controllers/PromotionController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
import { promotionValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.get('/periods/:id', PromotionController.getAllPeriodsWithoutSelf)
router.get('/periods', PromotionController.getAllPeriods)
router.post('/create', verifyAdmin, ...promotionValidator, PromotionController.create)
router.get('/:id', PromotionController.get)
router.put('/:id', verifyAdmin, ...promotionValidator, PromotionController.update)
router.delete('/:id', verifyAdmin, PromotionController.delete)
router.get('/', PromotionController.getAll)


export default router