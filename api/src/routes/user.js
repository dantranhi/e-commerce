import express from 'express';

import UserController from '../controllers/UserController.js'
import { verifyAdmin } from '../utils/verifyToken.js'

const router = express.Router();

router.patch('/:id', verifyAdmin, UserController.editRole)
router.delete('/:id', verifyAdmin, UserController.delete)
router.get('/', UserController.getAll)

export default router