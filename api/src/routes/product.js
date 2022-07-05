import express from 'express';
import ProductController from '../controllers/ProductController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
import { productValidator } from '../utils/dataValidator.js';
import paginate from '../utils/paginate.js'
import Product from '../models/Product.js'

const router = express.Router();

router.get('/type', ProductController.getAllTypes)
router.get('/brand', ProductController.getAllBrands)

router.get('/', paginate(Product, 1), ProductController.getAll)
router.get('/:id', ProductController.get)
router.post('/create', verifyAdmin, ...productValidator, ProductController.create)
router.put('/:id', verifyAdmin, ProductController.update)
router.delete('/:id', verifyAdmin, ProductController.delete)

export default router