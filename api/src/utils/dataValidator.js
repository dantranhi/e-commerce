import {check, body } from 'express-validator'

export const productValidator = [
    body('name').isLength({min: 1, max: 200}).withMessage('Tên sản phẩm <= 200 ký tự'),
    check('brand').notEmpty().withMessage('Hãng sản phẩm không được bỏ trống'),
    body('price').isFloat({ min: 0 }).withMessage('Giá phải là một số hợp lệ'),
    body('modelYear').isNumeric().withMessage('Năm model phải là số')
]
