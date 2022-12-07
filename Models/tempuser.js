const  mongoose = require("mongoose");

const Schema = mongoose.Schema

const tempuserSchema = new Schema({
    TUID:{
        type:mongoose.isValidObjectId,
        
    },
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:Number,
        require:true,
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
export default mongoose.model("TUser",tempuserSchema)