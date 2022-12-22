const express = require('express')
const {createOrder, paymentCallback, getPayment } = require('../controllers/checkoutController')
const router = express.Router()

router.post('/createorder', createOrder)
router.post('/payment/callback', paymentCallback)
router.get('/payments/:paymentId', getPayment)

module.exports = router