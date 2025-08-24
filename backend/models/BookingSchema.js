const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CustomerData',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
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
    },

    carDetails: {
        carid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CarData',
            required: true
        },
        carname: String,
        carimage: String,
        carprice: Number,
    },
    customerDetails: {
        name: String,
        rentalDetail: String,
        phone: Number
    },
    booking_id: {
        type: String,
        required: true
    },
    Paymentstatus: {
        type: String,
        default: 'Paid'
    },
    created: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Paid', 'Ongoing', 'Returned'],
        default: 'Paid'
    },
    feedback: {
        type: String,
        default: ''
    }


})

module.exports = mongoose.model('BookingData', BookingSchema)