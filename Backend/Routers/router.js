const express=require('express');
const { allHotelFun, searchFun,getDetailByIdfun,getResultbyFilterFun, hotelBookingFun, myBookingFun, reviewFun} = require('../Controllers/controller');
const { userRegister, userlgoin ,myProfileFun} = require('../Authenticaions/auth');
const { verifyToken, upload } = require('../Servcies/services');
const multer = require('multer');
const router=express.Router()

router.post("/register",(req,res,next)=>{
    // console.log(req.body)
    next()
},userRegister) // Done
router.post("/login",(req,res,next)=>{
    // console.log(req.body)
    next()
},userlgoin) // Done

router.post("/sendreview",verifyToken,reviewFun)

router.post("/hotel/booking",(req,res,next)=>{
    // console.log("8888888888888888       ---------")
    // console.log(req.body)
    next()
},verifyToken,hotelBookingFun)
router.get("/hotel/mybooking",verifyToken,myBookingFun)
router.post("/profile",upload.single('image'),verifyToken,myProfileFun)

router.get("/hotels/search",getResultbyFilterFun) // Done
router.get("/hotels",(req,res,next)=>{
    // console.log(req)
    next()
},allHotelFun); // Done
router.get("/hotels/:id",(req,res,next)=>{
    // console.log("hi how are you ")
    next()
},getDetailByIdfun); // Done

router.get("/search",(req,res,next)=>{
console.log("Query ",req.query);
    next()
},searchFun)
module.exports=router