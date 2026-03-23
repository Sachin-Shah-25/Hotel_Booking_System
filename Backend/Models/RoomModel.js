const mongoose = require('mongoose')
const { type } = require('os')



const roommodelschema = new mongoose.Schema({

    hotelid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotels'
    },
    roomNumber: {
        type: String
    },
     type: {
        type: String
    },
    pricePerNight:{
        type:Number
    },
    capacity:{
        type:Number
    },
    availability:[{
        type:String
    }],
    amenities:[{
        type:String
    }]
})

const roommodel = mongoose.model("rooms", roommodelschema)

module.exports = roommodel