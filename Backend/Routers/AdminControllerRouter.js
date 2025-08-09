const express=require('express')
const { addHotelDataFun } = require('../Controllers/AdminControllers')
const adminrouter=express.Router()



adminrouter.get("/hoteldata",addHotelDataFun)


module.exports=adminrouter