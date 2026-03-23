const hotelmodel = require("../Models/HotelModel")
const hoteldata=require('../Data/hoteldata.json');
const hotelrooms=require('../Data/hotel_rooms.json');
const roommodel = require("../Models/RoomModel");

const addHotelDataFun= (req,res) => {
    try {
        hoteldata.forEach(async(obj,id) => {
            const savehoteldata=new hotelmodel({
                    id: `h${id+1}`,
                    name:obj.name,
                    pricePerNight:obj.pricePerNight,
                    rating:obj.rating,
                    city:obj.city,
                    description:obj.description,
                    thumbnail:obj.thumbnail
                })
            await savehoteldata.save()


            const getRoomdata=hotelrooms[id]
            const saveroomdata=new roommodel({
                hotelid:savehoteldata._id,
                roomNumber:getRoomdata.roomNumber,
                type:getRoomdata.type,
                pricePerNight:getRoomdata.pricePerNight,
                capacity:getRoomdata.capacity,
                availability:[...getRoomdata.availability],
                amenities:[...getRoomdata.amenities]
            })
            await saveroomdata.save()

        });
        
        return res.status(200).json({
            success:true,
            message:"Added",
            data:hoteldata
        })
    } catch (error) {
        console.log("Error : ",error.message)
        return res.status(500).json({success:false,message:error.message})
    }
}

module.exports={addHotelDataFun}