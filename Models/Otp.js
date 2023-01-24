const mongoose = require('mongoose')

const OtpSchema = new mongoose.Schema({
    _id: {
        type:mongoose.Schema.Types.ObjectId,
        default: this._id},
    otp:{
        type: String.required
    },
    email:{
        type: String.required
    },
})

module.exports = mongoose.model("Otp", OtpSchema)