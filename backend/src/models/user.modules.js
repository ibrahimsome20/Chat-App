import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'please enter the name']
    },
    email:{
        type:String,
        required:[true,'please enter the  email'],
        match:[/.+\@.+\..+/, 'Please fill a valid email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true,'enter password'],
        minlength:[6,'min lenght is 6'],
        select:false
    },
    avatar:{
        type:String,
        default:null
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{timestamps:true})



export default mongoose.model('User',UserSchema)