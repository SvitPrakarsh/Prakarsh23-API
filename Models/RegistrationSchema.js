const mongoose = require('mongoose')

const TempPraticipentSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    phone:{
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
    }
})

const RegistrationSchema = mongoose.Schema({
    RID: {
        type: mongoose.SchemaTypes.ObjectId,
        default: this._id
    },
    UID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User"
    },
    promoter: {
        type: mongoose.SchemaType.ObjectId,
        ref: "Promoter"
    },
    event: {
        type: mongoose.SchemaType.ObjectId,
        ref: "Event"
    },
    participents: [TempPraticipentSchema]
})

module.exports = mongoose.model("Registration", RegistrationSchema)