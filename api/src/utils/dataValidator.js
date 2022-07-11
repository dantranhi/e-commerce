import {check, body } from 'express-validator'

export const productValidator = [
    body('name').isLength({min: 1, max: 200}).withMessage('Tên sản phẩm <= 200 ký tự'),
    check('brand').notEmpty().withMessage('Hãng sản phẩm không được bỏ trống'),
    check('type').notEmpty().withMessage('Loại sản phẩm không được bỏ trống'),
    body('price').isFloat({ min: 0 }).withMessage('Giá phải là một số hợp lệ'),
    body('modelYear').isNumeric().withMessage('Năm model phải là số')
]
export const promotionValidator = [
    body('name').isLength({min: 1, max: 300}).withMessage('Tên chương trình khuyến mãi phải từ 1-300 ký tự'),
    body('content').isArray({min: 1}).withMessage('Chương trình khuyến mãi phải có ít nhất 1 khuyến mãi'),
    body('content.*.productId').notEmpty().withMessage('Sản phẩm của đợt khuyến mãi là bắt buộc'),
    body('startEndDate').isArray({min: 2, max: 2}).withMessage('Phải có đủ thời gian bắt đầu và kết thúc khuyến mãi')
]
