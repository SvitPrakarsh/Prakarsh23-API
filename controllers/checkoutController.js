require('dotenv').config()
const uniquId = require('uniquid')
const path = require('path')
const Formidable = require('formidable')
const crypto = require('crypto')
const request = require('request')
const orderSchema = require('../Models/OrderSchema')
const Razorpay = require('razorpay')
const OrderSchema = require('../Models/OrderSchema')

let orderId;

var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

const createOrder = (req, res) =>{
    var options = {
        amount: 50000,
        currency: "INR",
        receipt: uniquId()
    }

    instance.orders.create(options, function (err, order){
        if(err){
            return res.status(500).json({
                error: err
            })
        }

        orderId = order.id
        res.json(order)

    })
}

const paymentCallback = (req, res)=>{
    const form = Formidable()
    form.parse(req, (err, fields, files)=>{
        if(fields){
            console.log(fields)
            const hash = crypto
                .createHmac('sha256', process.env.RAZORPAY_SECRET)
                .update(orderId+'|'+fields.razorpay_payment_id)
                .digest('hex')

            if(fields.razorpay_signature === hash){
                const info ={
                    _id: fields.razorpay_payment_id,
                    razorpay_order_id: fields.razorpay_order_id
                }
                const order = new OrderSchema({
                    _id: info._id,
                    orders: info.razorpay_order_id
                })

                orders.save((err, data)=>{
                    if(err){
                        res.status(400).json({
                            error: 'Not able to save in db'
                        })
                    } else {
                        res.send(
                            'payment ok'
                        )
                    }
                })

            }
        } else {
            res.send('ERROR')
        }
    })
}

const getPayment = (req, res)=>{
    orderSchema.findById(req.params.paymentId).exec((err, data)=>{
        if(err || data ==null){
            return res.json({
                error: 'not found'
            })
        }

        request(
            `https://${process.env.RAZORPAY_KEY}:${process.env.RAZORPAY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}`,
            function (error, response, body){
                if(body){
                    const result = JSON.parse(body)
                    res.result(200).json(result)
                }
            }
        )
    })
}

module.exports.createOrder = createOrder
module.exports.paymentCallback = paymentCallback
module.exports.getPayment = getPayment