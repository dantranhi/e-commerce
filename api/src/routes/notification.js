import express from 'express';

import NotificationController from '../controllers/NotificationController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router();

router.patch('/:id/:notificationId', verifyUser, NotificationController.updateStatus)
router.put('/:id', verifyUser, NotificationController.readAll)
router.get('/:id', verifyUser, NotificationController.getNotification)

export default router