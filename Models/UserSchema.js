const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    UID:{
        type:mongoose.Schema.Types.ObjectId,
        default: this._id
    },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    tc: { type: Boolean, required: true },
    is_promoter: {type: Boolean},
    phone:{
        type:Number,
        require:true,
        maxlength:10
    },
    college:{
        type:String,
        require:true
    },
    department:{
        type:String,
        require:true
    },

})

module.exports = mongoose.models.User || mongoose.model("User", UserSchema)