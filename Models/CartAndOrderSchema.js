const mongoose = require('mongoose')
const CartSchema = require('./CartSchema')

const CartAndOrderSchema = mongoose.Schema({
    order_id:{
        type: String,
        required: true,
    },
    cart: CartSchema,
})

module.exports = mongoose.model("CartAndOrder", CartAndOrderSchema)