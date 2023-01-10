const  mongoose = require("mongoose");


const ParticipantSchema = new Schema({
    PID:{
        type:mongoose.isValidObjectId,        
    },
    name:{
        type:String,
        require:true,
        maxlength:30
    },
    email:{
        type: String,
    },
    phone: Number,
    college: String,
    events:[{
        type: mongoose.SchemaType.objectId,
        ref: "Event"
    }],
    UID:{
        type:mongoose.isValidObjectId
    }

})

export default mongoose.model("Participant",ParticipantSchema)