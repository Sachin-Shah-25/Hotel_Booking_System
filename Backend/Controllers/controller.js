const bookingModel = require("../Models/BookingModel")
const hotelmodel = require("../Models/HotelModel")
const reviewModel = require("../Models/ReviewModel")
const roommodel = require("../Models/RoomModel")



const allHotelFun = async (req, res) => {
    try {
        const getAllHotelsData = await hotelmodel.find({})
        return res.status(200).json({
            success: true,
            message: "Added",
            mydata: getAllHotelsData
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


const getDetailByIdfun = async (req, res) => {
    try {
        const getId = req.params.id

        const getParticularHotel = await hotelmodel.findOne({ id: getId }).lean()

        if (!getParticularHotel) return res.status(404).json({
            "success": false,
            "message": "Nothing to Show"
        })
        const getParticularRoom = await roommodel.findOne({ hotelid: getParticularHotel._id }).lean()
        const getAllReviews = await reviewModel.find({ roomId: getParticularRoom._id }).populate({
            path:"roomId"
        }).populate({
            path:"userId"
        }).sort({createdAt: -1})
        const mergeobj = { ...getParticularHotel, room: getParticularRoom }
        return res.status(200).json({
            success: true,
            message: "Added",
            mydata: mergeobj,
            allreviews:  getAllReviews || []
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

const getResultbyFilterFun = async (req, res) => {
    try {
        const { name, city, price } = req.query

        const filters = {}
        if (name) filters.name = name
        if (price) filters.pricePerNight = +price
        if (city) {
            const str = city[0].toUpperCase() + city.substring(1)
            filters.city = str
        }
        const getResultByFilter = await hotelmodel.findOne(filters)
        return res.status(200).json({
            success: true,
            message: "Filter",
            data: getResultByFilter
        })
    } catch (error) {
        console.log("Error : ", error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const hotelBookingFun = async (req, res) => {
    try {
        const { fullName, guestName, phoneNumber, checkIn, checkOut, guests, special, userId, roomId, hotelId } = req.body

        const getRoomData = await roommodel.findOne({ _id: roomId })
        const totalPrice = getRoomData.totalPrice || 65223

        const isBookingSuccess = new bookingModel({
            userId, hotelId, roomId, fullName, guestName, phoneNumber, special, guests, checkIn, checkOut, totalPrice
        })
        await isBookingSuccess.save()

        return res.status(200).json({
            success: true,
            message: "Booking Successfully",
            user: req.user,
            mydata: isBookingSuccess
        })


    } catch (error) {
        console.log("Error : ", error.message)
        return res.status(500).json({ success: false, message: error.message })
    }
}

const myBookingFun = async (req, res) => {

    try {
        const userId = req.user.userId
        const myAllBooking = await bookingModel.find({ userId }).populate({
            path: 'hotelId'
        }).populate({
            path: 'roomId'
        })

        return res.status(200).json({
            success: true,
            message: "My List",
            user: req.user,
            mydata: myAllBooking
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}


const reviewFun = async (req, res) => {
    try {
        const { review } = req.body
        const roomId = req.headers.roomid
        const getId = req.user.userId || req.user._id
        const createView=new reviewModel({roomId,userId:getId,review})
        await createView.save()

        return res.status(200).json({
            success: true,
            message: "Thanks For Your Review"
        })
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        })
    }
}




module.exports = { allHotelFun, getDetailByIdfun, getResultbyFilterFun, hotelBookingFun, myBookingFun, reviewFun }