const { request } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const Cart = require('../Models/CartSchema')
const Coupon = require('../Models/CouponSchema')
const Event = require('../Models/EventSchema')
const Team = require('../Models/TeamSchema')
const Registration = require('../Models/RegistrationSchema')


// arguments = EID (event id), TID (team id) or Team detail
const addToCart = (req, res) =>{

    // extract information
    const user = req.user
    const cart = Cart.findById(user.CID)
    const event = Event.findById(req.body.EID)
    
    // make or find team
    if(req.TID){
        const team = Team.findById(TID)
    } else {
        const alias = req.team.alias
        const members = req.team.members
        
        const team = Team.create({
            UID: user._id,
            alias: alias,
            members: members
        })
    }

    // register Team
    const registration = Registration.create({
        UID: user._id,
        promoter: user.promoter,
        EID: event._id,
        team: team,
    })
    
    // add registered team to cart
    cart.methods.addEvent(registration, (err, docs)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    })
}

const removeFromCart = (req, res) =>{
    const user = req.uesr
    const RID = req.body.RID
    const registration = Registration.findById(RID)

    const cart = Cart.findById(user.CID)

    cart.methods.removeEvent(registration, (err, docs)=>{
        if(err){
            res.status(500).send(err)
        } else {
            res.status(200).send(docs)
        }
    })
}

const applyCouponCode = (req, res) =>{
    const coupon = Coupon.findOne({code: req.body.coupon_code})
    const cart= Cart.findById(req.user.CID)
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
    const cart= Cart.findById(req.user.CID)
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