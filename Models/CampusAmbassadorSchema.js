const mongoose = require('mongoose')

const CampusAmbassadorSchema = mongoose.Schema({
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
    coupon: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Coupon"
    }

})

module.exports = mongoose.model("CampusAmbassador", CampusAmbassadorSchema)