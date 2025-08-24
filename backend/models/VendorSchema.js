const mongoose = require('mongoose')
 
var VendorSchema = new mongoose.Schema({
    fullname: {type:String, required: true},
    email: {type:String, required: true},
    phone: {type:String, required: true},
    password: {type:String, required: true}
})

module.exports = mongoose.model('VendorData', VendorSchema)
