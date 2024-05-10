import express from "express";
import './utils/db.js'
import cors from "cors";
import { adminrouter } from "./routes/adminroute.js";
import { userrouter } from "./routes/userroute.js";
import { staffrouter } from "./routes/staffroute.js";
import Jwt from "jsonwebtoken";
import  decode  from "punycode";
import cookieParser from "cookie-parser";




const app = express()

app.use(cors({
    origin: ['https://nfonaponline-gnkmgtnqw-roylsofts-projects.vercel.app','https://admin-rust-gamma.vercel.app'],
    methods:[ 'POST','GET','PUT','DELETE'],
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))
app.use('/auth',adminrouter)
app.use('/student',userrouter)
app.use('/staff',staffrouter)




const verifyUser = (req, res, next) => {
const token = req.cookies.token;
if (token) {
    Jwt.verify(token, "jwt_secretmysecret_key", (err, decoded) => {
        if(err){ console.log(err); return res.json({Status: false, Error: "Wrong token"})}
        req.mat=decoded.matricule
        req.role=decoded.role
        next()
    })
} else {
    return res.json({Status: false, Error: "Not authanticated"})
}
}

app.get('/verify', verifyUser, (req, res)=>{
    return res.json({Status: true, role: req.role, mat: req.mat})
})

app.listen(3000,'0.0.0.0', ()=>{
    console.log("Server is running")
 })

