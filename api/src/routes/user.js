import express from 'express';

import UserController from '../controllers/UserController.js'
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js'

const router = express.Router();

router.patch('/:id', verifyAdmin, UserController.editRole)
router.delete('/:id', verifyAdmin, UserController.delete)
router.post('/:id/add-to-wishlist', verifyUser, UserController.addToWishlist)
router.get('/:id/wishlist', verifyUser, UserController.getWishlist)
router.delete('/:id/wishlist/:productId', verifyUser, UserController.removeWishlist)
router.get('/', UserController.getAll)

export default router