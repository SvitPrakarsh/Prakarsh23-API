const Razorpay = require('razorpay')
var env = require('dotenv').config(); 

const instance = new Razorpay({key_id:process.env.RAZORPAY_KEY, key_secret:process.env.RAZORPAY_SECRET})

const createOrderPayment = (options) =>{
    let result = null
    instance.orders.create(options, (err, order) => {  
        console.log(order)
        result = order
    })
    console.log(result)
    return result
}

module.exports = createOrderPayment