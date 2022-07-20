import express from 'express';
import PromotionController from '../controllers/PromotionController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
import { promotionValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.get('/', PromotionController.getAll)
router.get('/type', PromotionController.getAllTypes)
router.get('/periods/:id', PromotionController.getAllPeriodsWithoutSelf)
router.get('/periods', PromotionController.getAllPeriods)
router.get('/:id', PromotionController.get)
router.post('/create', verifyAdmin, ...promotionValidator, PromotionController.create)
router.put('/:id', verifyAdmin, ...promotionValidator, PromotionController.update)
router.delete('/:id', verifyAdmin, PromotionController.delete)


export default router