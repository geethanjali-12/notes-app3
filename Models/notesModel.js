const mongoose=require("mongoose");
const { applyTimestamps } = require("./userModel");
const noteSchema=mongoose.Schema({
    //to be added user collection
    
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"user"
        },
    
    title:{
        type:String,
        required:[true,"Please a added a title to the note"]
    },
    desc:{
        type:String,
        required:false
    },
    text:{
        type:String,
        required:[true,"Please enter the text"]
    }
    
},{
    Timestamps:true,
})

module.exports = mongoose.model("Note", noteSchema);
