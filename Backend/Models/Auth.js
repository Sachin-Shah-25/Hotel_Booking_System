const mongoose=require('mongoose')



const authSchema=new mongoose.Schema({

    id:{type:String,required:false},
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:false},
    profile:{type:String},
},{timestamps:true})

const registrationModel=mongoose.model("users",authSchema)

module.exports=registrationModel