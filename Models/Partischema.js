const  mongoose = require("mongoose");

const Schema = mongoose.Schema

const PartiSchema = new Schema({
    PID:{
        type:mongoose.isValidObjectId,
        
    },
    name:{
        type:String,
        require:true
    },
    EID:{
        type:mongoose.isValidObjectId
    },
    UID:{
        type:mongoose.isValidObjectId
    }

})

export default mongoose.model("Parti",PartiSchema)