const mongoose = require('mongoose')

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
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Promoter",
        default: null,
    },
    EID: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Event"
    },
    team: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Team"
    },
})

module.exports = mongoose.model("Registration", RegistrationSchema)