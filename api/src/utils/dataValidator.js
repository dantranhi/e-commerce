import { check, body } from 'express-validator'

export const productValidator = [
    body('name').isLength({ min: 1, max: 200 }).withMessage('Tên sản phẩm <= 200 ký tự'),
    check('brand').notEmpty().withMessage('Hãng sản phẩm không được bỏ trống'),
    check('type').notEmpty().withMessage('Loại sản phẩm không được bỏ trống'),
    body('price').isFloat({ min: 0 }).withMessage('Giá phải là một số hợp lệ'),
    body('modelYear').isNumeric().withMessage('Năm model phải là số')
]
export const promotionValidator = [
    body('name').isLength({ min: 1, max: 300 }).withMessage('Tên chương trình khuyến mãi phải từ 1-300 ký tự'),
    body('content').isArray({ min: 1 }).withMessage('Chương trình khuyến mãi phải có ít nhất 1 khuyến mãi'),
    body('content.*.productId').notEmpty().withMessage('Sản phẩm của đợt khuyến mãi là bắt buộc'),
    body('startEndDate').isArray({ min: 2, max: 2 }).withMessage('Phải có đủ thời gian bắt đầu và kết thúc khuyến mãi')
]

export const userValidator = [
    body('username').isLength({ min: 6, max: 20 }).withMessage('Tên đăng nhập phải từ 6-20 ký tự'),
    body('email').isEmail().withMessage('Email không hợp lệ'),
    body('password').notEmpty().withMessage('Mật khẩu không được trống').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/).withMessage('Mật khẩu phải dài tối thiểu 6 ký tự và chứa ít nhất 1 ký tự hoa, 1 ký tự thường và 1 số'),
]

export const orderValidator = [
    body('userAddress').notEmpty().withMessage('Địa chỉ người nhận là bắt buộc'),
    body('userPhone').matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/).withMessage('Số điện thoại không hợp lệ'),
    body('productList.*.quantity').isInt({ min: 1 }).withMessage('Số lượng không hợp lệ')
]
