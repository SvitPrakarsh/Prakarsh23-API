const mongoose = require('mongoose')

const CampusAmbassadorSchema = new mongoose.Schema({
<<<<<<< HEAD
    CAID:{
        type:mongoose.Schema.Types.ObjectId,
        default: this._id
    },
=======
>>>>>>> f7973502b15a8a4ca30a82f77abd5e68c771318a
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

<<<<<<< HEAD
module.exports = mongoose.model("Ambassador", CampusAmbassadorSchema)
=======
module.exports = mongoose.model("CampusAmbassador", CampusAmbassadorSchema)
>>>>>>> f7973502b15a8a4ca30a82f77abd5e68c771318a
