const express = require('express')
const router = express.Router()
const { addToCart,
    removeFromCart,
    applyCouponCode,
    removeCouponCode } = require('../controllers/cartController')

router.post('/add-to-cart', addToCart)

router.post('/remove-from-cart', removeFromCart)

router.post('/apply-coupon-code', applyCouponCode)

router.post('/remove-coupon-code', removeCouponCode)

module.exports = router