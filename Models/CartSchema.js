const mongoose = require('mongoose')
const Event = require('./EventSchema')

const CartSchema = new mongoose.Schema({
    CID: {
        type: mongoose.SchemaTypes.ObjectId,
        default: this._id
    },
    UID: {
        type:mongoose.SchemaTypes.ObjectId,
        ref: "User",
        require:true,
    },
    events: [],
    registrations: [],
    coupon: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Coupon",
        default: null
    },
    coupon_code: {
        type: String,
        default: null
    },
    value: {
        type: Number,
        required:true,
        default: 0,
    },
    discountPercentage: {
        type: Number,
        min: 0,
        max: 100,
        default: 0
    },
    discount: { 
        type: Number,
        required: true,
        default:function(){
            return (this.discountPercentage/this.value)*100
        },
    },
    total: {
        type: Number,
        required: true,
        default: function(){
            return this.value - this.discount
        },
    }, 
})

CartSchema.methods.addEvent = async (registration, cb) =>{
    const event = Event.findById(registration.EID)

    if(this.events.includes(registration.EID)){
        return cb({message: "Event already added"}, null)
    } else {
        this.events.push(registration.EID)
        this.registrations.push(registration._id)
        this.value = this.value + event.price
    }
    try{
        await this.save()
    }
    catch(e){
        console.log(e)
        return cb({message: "Something went wrong"},null)
    }
    return cb(null, {message: "Event added successfully"})
}

CartSchema.methods.removeEvent = async (registration, cb)=>{
    const event = Event.findById(registration.EID)
    if(this.events.includes(registration.EID)){
        this.events = this.events.filter(item => item!=registration.EID)
        this.value = this.value - event.price
        try{
            await this.save()
        }
        catch(e){
            console.log(e)
            return cb({message: "Something went wrong"})
        }
        return cb(null, {message: "Event removed successfully"})
    }
}

CartSchema.methods.addCoupon = async (coupon, cb) =>{
    this.coupon = coupon._id
    this.coupon_code = coupon.code
    this.discountPercentage = coupon.discountPercentage
    try{
        await this.save()
    }
    catch(e){
        console.log(e)
        return cb({message: "Something went wrong"}, null)
    }
    return cb(null, {message: "Coupon added successfully"})
}

CartSchema.methods.removeCoupon = async (cb) =>{
    this.discountPercentage = 0
    try{
        await this.save()
    }
    catch(e){
        console.log(e)
        return cb({message: "Something went wrong"}, null)
    }
    return cb(null, {message: "coupon removed successfully"})
}

CartSchema.methods.clearCart = async(cb) =>{
    this.events = []
    this.registrations = []
    this.value = 0
    await this.save()
    return cb(null, {message:"cart reset"})
}
module.exports.CartSchema = CartSchema
module.exports.Cart = mongoose.model("Cart", CartSchema)