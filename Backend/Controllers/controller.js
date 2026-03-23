const bookingModel = require("../Models/BookingModel")
const hotelmodel = require("../Models/HotelModel")
const reviewModel = require("../Models/ReviewModel")
const roommodel = require("../Models/RoomModel")
const roomdata = require('../room.json')


const allHotelFun = async (req, res) => {
    console.log(req.params)
    console.log(req.query)
    try {
        const getAllHotelsData = await hotelmodel.find({})
        // console.log(getAllHotelsData)
        // addDataFun(getAllHotelsData)
        return res.status(200).json({
            success: true,
            message: "Added",
            mydata: getAllHotelsData
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


//    const addDataFun = async (alldata) => {
//     await Promise.all(
//         alldata.map((data, i) => {
//             const room = roomdata[i];
//             console.log(room)
//             return roommodel.create({
//                 hotelid: data._id,
//                 roomNumber: room.roomNumber,
//                 type: room.type,
//                 pricePerNight: room.pricePerNight,
//                 capacity: room.capacity,
//                 availability: room.availability,
//                 amenities: room.amenities
//             });
//         })
//     );

// }
const getDetailByIdfun = async (req, res) => {
    try {
        const getId = req.params.id

        const getParticularHotel = await hotelmodel.findOne({ id: getId }).lean()
        // console.log(getParticularHotel)
        if (!getParticularHotel) return res.status(404).json({
            "success": false,
            "message": "Nothing to Show"
        })
        const getParticularRoom = await roommodel.findOne({ hotelid: getParticularHotel._id }).lean()
        const getAllReviews = await reviewModel.find({ roomId: getParticularRoom._id }).populate({
            path: "roomId"
        }).populate({
            path: "userId"

        }).sort({ createdAt: -1 })
        const mergeobj = { ...getParticularHotel, getParticularRoom }

        // const mergeobj = getParticularHotel
        // console.log(" 9999999999 ", mergeobj)
        return res.status(200).json({
            success: true,
            message: "Added",
            mydata: mergeobj,
            allreviews: getAllReviews || []
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
        return res.status(500).json({ success: false, message: error.message })
    }
}

const hotelBookingFun = async (req, res) => {
    try {
        const { fullName, guestName, phoneNumber, checkIn, checkOut, guests, special, userId, roomId, hotelId } = req.body
        // console.log("Room Id ", roomId, " ", userId)
        const getRoomData = await roommodel.findOne({ _id: roomId })
        const totalPrice = getRoomData.totalPrice || 65223
        // console.log("find Id ", getRoomData)
        const isBookingSuccess = new bookingModel({
            userId, hotelId, roomId, fullName, guestName, phoneNumber, special, guests, checkIn, checkOut, totalPrice
        })
        await isBookingSuccess.save()
        // console.log(isBookingSuccess)
        return res.status(200).json({
            success: true,
            message: "Booking Successfully",
            user: req.user,
            mydata: isBookingSuccess
        })


    } catch (error) {
        // console.log(error.message)
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
        // console.log("lllllllllllllllllllllll ",myAllBooking)
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
        const createView = new reviewModel({ roomId, userId: getId, review })
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



const searchFun = async (req, res) => {
    const { query } = req.query
    try {
       
        const data = await hotelmodel.find({ city: { $regex: `^${query}$`, $options: "i" } })
        console.log(data)
        return res.status(200).json({ success: true, mydata: data })
    }
    catch (e) {
        console.log(e.message)
        return e
    }
}


module.exports = { allHotelFun, getDetailByIdfun, getResultbyFilterFun, hotelBookingFun, myBookingFun, reviewFun, searchFun }