const mongoose=require('mongoose')


const createHotelSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  rating: { type: Number, required: true }, 
  city: { type: String, required: true },
  description:{type:String, required:true},
  thumbnail: { type: String }
},{timestamps:true});



const hotelmodel=mongoose.model("hotels",createHotelSchema)

module.exports=hotelmodel