const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    college: String,
})

const TeamSchema = new mongoose.Schema({
    TID:{
        type: mongoose.SchemaTypes.ObjectId,
        default: this._id
    },
    UID:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    alias: String,
    members:[MemberSchema],
})

module.exports = mongoose.model("Team", TeamSchema)