const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        min: 8,
        max: 8,
    }, 
    discountPercentage: {
        type: Number,
        required: true,
    },
    ambassador: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "CampusAmbassador"
    },
    valid: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("Coupon", CouponSchema)