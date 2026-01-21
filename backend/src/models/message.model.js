import mongoose from "mongoose";


const messageSchema=new mongoose.Schema({
    senderId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
            },
    recivedId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
    },
    imageMessage:{
        type:String
    }
},{timestamps:true})



export default mongoose.model("Messages",messageSchema)