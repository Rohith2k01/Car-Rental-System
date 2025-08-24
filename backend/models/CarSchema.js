const mongoose = require('mongoose')

const CarSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VendorData',
        required: true
    },
    vendorName: {
        type: String,
        required: true,
    },
    vendorPhone: {
        type: String,
        required: true,
    },
    carImage: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        required: true
    },
    carSeat: {
        type: Number,
        required: true
    },
    carMileage: {
        type: Number,
        required: true
    },
    carPrice: {
        type: Number,
        required: true
    },
    carDis: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: true, // You can set false if needed
    }
})

module.exports = mongoose.model('CarData', CarSchema)