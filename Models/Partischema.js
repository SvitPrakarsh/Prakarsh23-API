const  mongoose = require("mongoose");

const Schema = mongoose.Schema

const PartiSchema = new Schema({
    PID:{
        type:mongoose.Schema.Types.ObjectId,
        
    },
    name:{
        type:String,
        require:true,
        maxlength:30
    },
    EID:{
        type:mongoose.isValidObjectId
    },
    UID:{
        type:mongoose.isValidObjectId
    }

})

export default mongoose.model("Parti",PartiSchema)