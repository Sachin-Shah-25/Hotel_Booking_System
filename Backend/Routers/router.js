const express=require('express');
const { allHotelFun, getDetailByIdfun,getResultbyFilterFun, hotelBookingFun, myBookingFun, reviewFun} = require('../Controllers/controller');
const { userRegister, userlgoin ,myProfileFun} = require('../Authenticaions/auth');
const { verifyToken, upload } = require('../Servcies/services');
const multer = require('multer');
const router=express.Router()

router.post("/register",userRegister) // Done
router.post("/login",userlgoin) // Done
router.post("/sendreview",verifyToken,reviewFun)

router.post("/hotel/booking",verifyToken,hotelBookingFun)
router.get("/hotel/mybooking",verifyToken,myBookingFun)
router.post("/profile",upload.single('image'),verifyToken,myProfileFun)

router.get("/hotels/search",getResultbyFilterFun) // Done
router.get("/hotels",allHotelFun); // Done
router.get("/hotels/:id",getDetailByIdfun); // Done

module.exports=router