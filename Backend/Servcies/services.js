const jwt = require('jsonwebtoken')
const multer=require('multer')

const verifyToken = (req, res, next) => {
    if (!req.cookies[process.env.TOKEN]) res.status(401).json({ success: false, message: "Unauthorized Login Again" })
    const user = jwt.verify(req.cookies[process.env.TOKEN], process.env.MY_SECRET_KEY)
    req.user = user
    return next()
}


const storage=multer.diskStorage({
    filename:(req,file,cb)=>{
        console.log(file)
        return cb(null,file.originalname)
    },
    destination:(req,file,cb)=>{
        return cb(null,"static/images")
    }
})

const upload=multer({storage})

module.exports={verifyToken,upload}