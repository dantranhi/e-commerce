import { validationResult } from 'express-validator'

import Product from '../models/Product.js'
import Type from '../models/Type.js'
import Brand from '../models/Brand.js'

class ProductController {
    // [GET] /product
    async getAll(req, res, next) {
        try {
            const products = await Product.find()
            res.json(products)
        } catch (error) {
            next(error)
        }
    }


    // [GET] /product/:id
    async get(req, res, next) {
        try {
            const product = await Product.findById(req.params.id)
            if (!product)
                return res.json({ message: 'Product with that id is not exist.' })
            res.json(product)
        } catch (error) {
            next(error)
        }
    }

    // [GET] /product/type
    async getAllTypes(req, res, next) {
        try {
            const types = await Type.find()
            console.log(types)
            res.json(types)
        } catch (error) {
            res.json({ message: error })
        }
    }

    // [GET] /product/brand
    async getAllBrands(req, res, next) {
        try {
            const brands = await Brand.find()
            res.json(brands)
        } catch (error) {
            res.json({ message: error })
        }
    }

    // [POST] /product/create
    async create(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        try {
            const savedProduct = new Product(req.body)
            const typeAlreadyExists = await Type.findOne({ name: req.body.type })
            const brandAlreadyExists = await Brand.findOne({ name: req.body.type })
            if (!typeAlreadyExists) {
                const newType = new Type({ name: req.body.type })
                await newType.save()
            }
            if (!brandAlreadyExists) {
                const newBrand = new Brand({ name: req.body.brand })
                await newBrand.save()
            }
            await savedProduct.save()
            res.json(savedProduct)
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /product/:id
    async update(req, res, next) {
        try {
            await Product.findByIdAndUpdate(req.params.id, req.body)
            res.json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }

    // [DELETE] /product/:id
    async delete(req, res, next) {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({ message: 'Product deleted' })
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()