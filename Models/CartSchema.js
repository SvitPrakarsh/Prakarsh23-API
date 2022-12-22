const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    CID: {
        type: mongoose.SchemaTypes.ObjectId,
        default: this._id
    },
    UID: {
        type:mongoose.SchemaType.ObjectId,
        ref: "User",
        require:true,
    },
    events: [],
    registrations: [],
    coupon: {
        type: mongoose.SchemaType.ObjectId,
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

CartSchema.methods.addEvent = async (event, cb) =>{
    if(this.events.includes(event.EID)){
        return cb({message: "Event already added"}, null)
    } else {
        this.events.push(event.EID)
        this.value = this.value + EID.price
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

CartSchema.methods.removeEvent = async (event, cb)=>{
    if(this.events.includes(event.EID)){
        this.events = this.events.filter(item => item!=event.EID)
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
    this.value = 0
    await this.save()
    return cb(null, {message:"cart reset"})
}

module.exports = mongoose.model("Cart", CartSchema)