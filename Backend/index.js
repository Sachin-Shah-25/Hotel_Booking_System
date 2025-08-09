const express = require('express')
const dotenv = require('dotenv')
const { default: mongoose } = require('mongoose')
const path = require('path')
const adminrouter = require('./Routers/AdminControllerRouter')
const router = require('./Routers/router')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()
const { upload } = require('./Servcies/services')
const jwt = require('jsonwebtoken')
const registrationModel = require('./Models/Auth')

const session = require('express-session')
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy

const options = {
    origin: "http://localhost:5173",
    credentials: true
}
app.use(cookieParser())

dotenv.config()

app.use(session({
    secret: process.env.MY_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(path.join(__dirname, 'static')))
app.use(cors(options))

app.use(passport.initialize())
app.use(passport.session())




passport.use(new GoogleStrategy({
    clientID: process.env.ID,
    clientSecret: process.env.SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {

    let userExists = ""
    const existingUser = await registrationModel.findOne({ email: profile.emails[0].value })
    if (existingUser) {
        userExists = existingUser
    }
    else {

        const createuser = new registrationModel({
            id: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            password: "",
            profile: profile.photos[0].value
        })

        await createuser.save()

        userExists = {
            username: profile.displayName,
            email: profile.emails[0].value,
            userId: createuser._id,
            _id: createuser._id,
            profile: profile.photos[0].value

        }
    }

    const token = jwt.sign({
        username: userExists.username,
        email: userExists.email,
        userId: userExists.userId,
        _id: userExists._id,
        profile: userExists.profile
    }, process.env.MY_SECRET_KEY)
    profile.token = token
    return done(null, profile)
})
)

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})


app.get('/auth/google', (req, res, next) => {
    next()
}, passport.authenticate('google', { scope: ['profile', 'email'] }))
 // authentication start form here 

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/back' })
    , (req, res, next) => {
        res.cookie(process.env.TOKEN, req.user.token, {
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000,
            path: "/"
        })
        return res.redirect("http://localhost:5173/")


    })

app.get("/back", (req, res) => {
    return res.json(req.user)
})

app.get('/api/logout', (req, res) => {

    res.clearCookie(process.env.TOKEN, { path: "/" });
    return res.status(200).json({ "success": true, message: "You have been logout" })
})




app.get('/me', async (req, res) => {
    if (!req.cookies[process.env.TOKEN]) return res.status(401).json({ success: false, message: "Unauthorized Login Again" })
    const user = jwt.verify(req.cookies[process.env.TOKEN], process.env.MY_SECRET_KEY)
    const getUserId= user.userId || user._id
    const isUserExists = await registrationModel.findOne({ _id: getUserId})
    return res.status(200).json({
        success: true,
        message: "User Found ",
        mydata: { ...user, profile: isUserExists.profile }
    })
})

app.use("/add", adminrouter)
app.use("/api", upload.none(),router)
app.use("/my",router)






mongoose.connect(process.env.DATABASE_URL).then(() => console.log("mongoose coonnected")).catch(e => console.log(e.message))
app.listen(8000, () => console.log("Server Started"))