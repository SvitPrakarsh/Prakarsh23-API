const mongoose = require('mongoose')

const PromoterSchema = new mongoose.Schema({
    PRID:{
        type:mongoose.Schema.Types.ObjectId,
        default: this._id
    },
    name: {
        type: String,
        requried: true
    }, 
    phone: {
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    college:{
        type: String,
        required: true
    },
    region: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Coupon"
    }
})

module.exports = mongoose.model("Promoter", PromoterSchema)