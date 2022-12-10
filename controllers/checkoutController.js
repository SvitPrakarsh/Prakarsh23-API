const express = require('express')
const createOrderPayment = require('../Payment/createOrderPayment')



const checkoutController = (req, res)=>{
    var options = {
        amount: 50000,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          key1: "value3",
          key2: "value2"
        }
    }
    const order = createOrderPayment(options)
    res.send(order)
}

module.exports = checkoutController