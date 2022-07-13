import express from 'express';
import ProductController from '../controllers/ProductController.js'
import { verifyAdmin } from '../utils/verifyToken.js'
import { productValidator } from '../utils/dataValidator.js';
import paginate from '../utils/paginate.js'
import Product from '../models/Product.js'

const router = express.Router();

router.get('/type', ProductController.getAllTypes)
router.get('/brand', ProductController.getAllBrands)

router.get('/grid', paginate(Product, 12), ProductController.getAllGrid)
router.get('/:id', ProductController.get)
router.post('/create', verifyAdmin, ...productValidator, ProductController.create)
router.put('/:id', verifyAdmin, ...productValidator, ProductController.update)
router.patch('/:id', verifyAdmin, ProductController.updateImages)
router.delete('/:id', verifyAdmin, ProductController.delete)

router.get('/', ProductController.getAll)
export default router