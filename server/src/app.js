const express=require("express")
const morgan = require("morgan")
const cors=require("cors")
const app=express()

//middleware
app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:false}))
app.use(cors())
app.use(morgan("dev"))

//routes
app.use('/api/v1',require("./routes/main.routes"))

module.exports=app