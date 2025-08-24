var Razorpay = require('razorpay')

var instance = new Razorpay({
    key_id:process.env.Payment_key_Id,
    key_secret: process.env.Payment_key_secret
})

module.exports = instance