const mongoose = require('mongoose')

const authOtpSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    otp:{
        type: String.required
    },
    email:{
        type: String.required
    },
})

module.exports = mongoose.model("authedotpuser", authOtpSchema)