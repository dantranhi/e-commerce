import express from 'express';

import OrderController from '../controllers/OrderController.js'
import { verifyUser, verifyAdmin } from '../utils/verifyToken.js'
import { orderValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.get('/user/:id', OrderController.getUserOrders)
router.post('/:id/create', ...orderValidator, verifyUser, OrderController.create)
router.patch('/:id', verifyAdmin, OrderController.updateStatus)
router.put('/:id', verifyUser, OrderController.cancelOrder)
router.delete('/:id', verifyAdmin, OrderController.delete)
router.get('/status', OrderController.getAllStatus)
router.get('/', OrderController.getAll)


export default router