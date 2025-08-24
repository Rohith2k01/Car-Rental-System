const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')

// dotenv file config
dotenv.config()

// middleware
app.use(cors())
app.use(express.json())

// database connection
mongoose.connect(process.env.mongodburl).then(()=>{
    console.log("database connected");
    
}).catch((error)=>{
    console.log("error from database",error);
    
})

// router files import
const AdminRouter = require("./routes/AdminRouter")
const VendorRouter = require("./routes/VendorRouter")
const CustomerRouter = require("./routes/CustomerRouter")
const CarRouter = require("./routes/CarRouter")
const RentalRouter = require("./routes/RentalRouter")
const BookingRouter = require("./routes/BookingRouter")

// calling routers middleware
app.use('/Admin',AdminRouter)
app.use('/Vendor',VendorRouter)
app.use('/Customer',CustomerRouter)
app.use('/Car',CarRouter)
app.use('/Rental',RentalRouter)
app.use('/Booking',BookingRouter)

// server creation
app.listen(8000,()=>{
    console.log('server created');
    
})

// http://localhost:8000/Admin/Signup