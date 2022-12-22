const { request } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const Cart = require('../Models/CartSchema')
const Coupon = require('../Models/CouponSchema')
const Event = require('../Models/EventSchema')

const addToCart = (req, res) =>{
    const user = null
    const cart = Cart.findOne({CID: ""})
    const event = Event.findOne({EID: req.body.EID})
    cart.methods.addEvent(event, (err, docs)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    })
}

const removeFromCart = (req, res) =>{
    const cart = Cart.findOne({CID: ""})
    const event = Event.findOne({EID: req.body.EID})
    cart.methods.removeEvent(event, (err, docs)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    })
}

const applyCouponCode = (req, res) =>{
    const coupon = Coupon.findOne({code: req.body.coupon_code})
    const cart= Cart.findOne({CID:""})
    if(coupon){
        cart.methods.addCoupon(coupon, (err, docs)=>{
            if(err){
                res.status(500).send(docs)
            } else {
                res.status(200).send(docs)
            }
        })
    } else {
        res.status(404).send({message:'Coupon code invalid'})
    }
}

const removeCouponCode = (req, res) =>{
    const cart = Cart.findOne({CID:""})
    cart.removeCoupon((err, docs)=>{
        if(err){
            res.status(500).send(docs)
        } else {
            res.status(200).send(docs)
        }
    })
}

module.exports.addToCart = addToCart
module.exports.removeFromCart = removeFromCart
module.exports.applyCouponCode = applyCouponCode
module.exports.removeCouponCode = removeCouponCode