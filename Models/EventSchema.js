const  mongoose = require("mongoose");
require('mongoose-type-url');

const RoundSchema = new mongoose.Schema({
    name: String,
    description: String,
})

const EventSchema = new mongoose.Schema({
    EID:{
        type:mongoose.Schema.Types.ObjectId,
        default: this._id,
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
    },
    maximum_team:{
        type: Number,
    },
    department:[],
    interest:[],
    year:[],
    // tech, nontech
    group:{
        type:String,
    },
    // circitrix
    catagory:{
        type: String, 
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