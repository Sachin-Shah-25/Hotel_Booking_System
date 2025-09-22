const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const registrationModel = require('../Models/Auth')
const jwt = require('jsonwebtoken')


const userRegister = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const isEmailExists = await registrationModel.findOne({ email })
        if (isEmailExists) return res.status(409).json({ success: false, message: "Email Already Exists" })
        const hash_password = await bcrypt.hash(password, 10)
        
        await registrationModel.create({
            username,email: email.toLowerCase(),
            password: hash_password
        })

        return res.status(200).json({
            success: true,
            message: "Registration Successfully",
            data: ""
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

const userlgoin = async (req, res) => {
    try {
        const {email,password } = req.body
        
        const isUserExists = await registrationModel.findOne({ email: email.toLocaleLowerCase() })
        
        if (!isUserExists) return res.status(404).json({ success: false, message: "Email Not Registerd" })

        const hash_password = await bcrypt.compare(password, isUserExists.password)
        if (!hash_password) return res.status(409).json({ success: false, message: "Password doesn't match" })
            
        const token = jwt.sign({
            username: isUserExists.username,
            email:isUserExists.email,
            userId: isUserExists._id,
            _id: isUserExists._id,
            profile:isUserExists.profile
        }, process.env.MY_SECRET_KEY)

        res.cookie(process.env.TOKEN, token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        })
        return res.status(200).json({
            success: true,
            message: "Login Successfully",
            mydata: isUserExists
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}

const myProfileFun = async (req, res) => {
    try {
        
        const getFile = req.file
        const userId = req.user.userId
        const getUser = await registrationModel.findOne({ _id: userId })

        if (!getUser) res.status(404).json({ success: false, message: "Email Not Registerd" })

            getUser.profile=getFile.filename
            await getUser.save()


        getUser.profile = getFile.originalname
        await getUser.save()
        return res.status(200).json({ success:true, message: "Profile Updated" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}


module.exports = { userRegister, userlgoin,myProfileFun }
