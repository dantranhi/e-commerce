import express from 'express';
import RevenueController from '../controllers/RevenueController.js'
import { verifyAdmin } from '../utils/verifyToken.js'


const router = express.Router();

router.get('/', verifyAdmin, RevenueController.getRevenue)
router.get('/chart', RevenueController.getRevenueChart)



export default router