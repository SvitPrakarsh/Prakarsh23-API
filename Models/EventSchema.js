const  mongoose = require("mongoose");
require('mongoose-type-url');

const RoundSchema = new mongoose.Schema({
    name: String,
    description: String,
})

const EventSchema = new mongoose.Schema({
    EID:{
<<<<<<< HEAD
        type:mongoose.Schema.Types.ObjectId,
        default: this._id,
=======
        type:mongoose.Schema.Types.ObjectId,        
>>>>>>> f7973502b15a8a4ca30a82f77abd5e68c771318a
    },
    title:{
        type:String,
        require:true,
        maxlength:25
    },
    description:{
        type:String,
        require:true
    },
    image:{
        type:mongoose.SchemaTypes.Url
    },
    video:{
        type:mongoose.SchemaTypes.Url

    },
    maximum_participants: {
        type: Number,
        required: true,
    },
    is_solo:{
        type: Boolean,
        default: function (){
            if(this.maximum_participants == 0){ return true }
            else {return false}
        }
    },
    rounds:[RoundSchema]
},{timestamps:true})

module.exports = mongoose.model('Event', EventSchema)