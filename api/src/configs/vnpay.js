export const vnpay = {
    vnp_TmnCode: process.env.VNPAY_CODE,
    vnp_HashSecret: process.env.VNPAY_SECRET,
    vnp_Url: "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
    vnp_ReturnUrl: "http://localhost:5000/order/vnpay_ipn"
}