import { validationResult } from 'express-validator'
import cloudinary from 'cloudinary'

import Product from '../models/Product.js'
import Type from '../models/Type.js'
import Brand from '../models/Brand.js'
import { createError } from '../utils/error.js'

class ProductController {
    // [GET] /product
    async getAll(req, res, next) {
        try {
            // const products = await Product.find()
            const products = res.paginatedResult
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
            const { photos, stock, ...dataToFindDuplicate } = req.body
            const isDuplicate = await Product.findOne(dataToFindDuplicate)
            if (!isDuplicate) {
                const savedProduct = new Product(req.body)
                const typeAlreadyExists = await Type.findOne({ name: req.body.type })
                const brandAlreadyExists = await Brand.findOne({ name: req.body.brand })
                if (!typeAlreadyExists) {
                    const newType = new Type({ name: req.body.type })
                    await newType.save()
                }
                if (!brandAlreadyExists) {
                    const newBrand = new Brand({ name: req.body.brand })
                    await newBrand.save()
                }
                await savedProduct.save()
                return res.json(savedProduct)
            }
            else next(createError(400, 'This product is already existed'))
        } catch (error) {
            next(error)
        }
    }

    // [PUT] /product/:id
    async update(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() });
        }
        try {
            const product = await Product.findById(req.params.id)
            if (product) {
                if (JSON.stringify(req.body.photos) !== JSON.stringify(product.photos)) {
                    product.photos.forEach(photoItem => {
                        cloudinary.v2.uploader.destroy(photoItem.public_id, function (error, result) {
                            console.log(result, error)
                        });
                    })
                }
            }
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body)
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    // [DELETE] /product/:id
    async delete(req, res, next) {
        try {
            await Product.findByIdAndDelete(req.params.id)
            res.json({ success: true, message: 'Product deleted' })
        } catch (error) {
            next(error)
        }
    }
}

export default new ProductController()