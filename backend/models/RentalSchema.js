const mongoose = require('mongoose')

var RentalSchema = new mongoose.Schema({
    carID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarData',
        required: true
    },
    carName:{type:String,required:true},
    carImage:{type:String,required:true},
    carPrice:{type:String,required:true},
    userID:{type: mongoose.Schema.Types.ObjectId,ref:'CustomerData',required:true},
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VendorData',
        required: true
    },
    vendorName: {
        type: String,
        required: true
    },
    vendorPhone: {
        type: String,
        required: true
    }
})

module.exports=mongoose.model('RentalData', RentalSchema)