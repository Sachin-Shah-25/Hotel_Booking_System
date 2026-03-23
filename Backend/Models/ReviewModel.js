const mongoose=require('mongoose')


const review_Model=new mongoose.Schema({
    roomId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"rooms"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    review:{
        type:String
    }
},{timestamps:true})



const reviewModel=  mongoose.model("review",review_Model)
module.exports = reviewModel;