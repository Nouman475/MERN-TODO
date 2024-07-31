const mongoose = require("mongoose")

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
       type:String,
       required:true,
    },
    user:[{
        type:mongoose.Types.ObjectId,
        ref:"user", 
    }],
})
 
module.exports = mongoose.model("List",listSchema)