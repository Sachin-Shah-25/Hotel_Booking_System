const mongoose=require('mongoose')

const bookingSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'users' ,required:true},
    hotelId:{type:mongoose.Schema.Types.ObjectId,ref:'hotels' ,required:true},
    roomId:{type:mongoose.Schema.Types.ObjectId,ref:'rooms' ,required:true},


    fullName:{type:String,required:true},
    guestName:{type:String},
    phoneNumber:{type:String,required:true},
    special:{type:String,required:false},
    guests:{type:Number,required:true},
    checkIn:{type:Date,required:true},
    checkOut:{type:Date,required:true},
    totalPrice:{type:Number,required:true},
    paymentStatus:{type:String,default:'Cash'},
    
},{timestamps:true})


const bookingModel=mongoose.model("booking",bookingSchema)

module.exports=bookingModel