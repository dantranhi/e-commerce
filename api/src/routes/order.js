import express from 'express';

import OrderController from '../controllers/OrderController.js'
import { verifyUser } from '../utils/verifyToken.js'
import { orderValidator } from '../utils/dataValidator.js';

const router = express.Router();

router.post('/:id/create', ...orderValidator, verifyUser, OrderController.create)


export default router