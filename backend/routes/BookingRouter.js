const router = require('express').Router()
const mongoose = require('mongoose');
const bookingSchema = require('../models/BookingSchema');
const razorpay = require('../utils/Razorpay')
const VerifyToken = require('../TokenVerification');
const CarSchema = require('../models/CarSchema');
const RentalSchema = require('../models/RentalSchema');


// adding new car booking

// adding new car booking
router.post('/Car-booking', VerifyToken, async (req, res) => {
    console.log('hi', req.body);
    const { amount, carDetails, customerDetails, userid } = req.body;

    try {
        // Create Razorpay order
        const options = {
            amount: amount * 10, // Convert to paisa
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const bookingDetails = await razorpay.orders.create(options);
        console.log(bookingDetails);

        // Fetch car info to get vendor details
        const carDoc = await CarSchema.findById(carDetails.carid);
        if (!carDoc) return res.status(404).json({ message: 'Car not found' });

        // Save booking to DB
        const newBooking = new bookingSchema({
            userid,
            vendorId: carDoc.userid,
            vendorName: carDoc.vendorName,
            vendorPhone: carDoc.vendorPhone,
            amount,
            booking_id: bookingDetails.id,
            carDetails: {
                carid: new mongoose.Types.ObjectId(carDetails.carid),
                carname: carDetails.carname,
                carimage: carDetails.carimage,
                carprice: carDetails.carprice
            },
            customerDetails
        });

        await newBooking.save();

        // Delete the car by its ID after booking saved
        const deletedCar = await CarSchema.findByIdAndDelete(carDetails.carid.toString());


        if (!deletedCar) {
            console.warn(`Car with ID ${carDetails.carid} not found or already deleted`);
        } else {
            console.log(`Car deleted: ${carDetails.carid}`);
        }

        // Delete rental entry after booking
        if (req.body.rentalid) {
            const deletedRental = await RentalSchema.findByIdAndDelete(req.body.rentalid);
            if (!deletedRental) {
                console.warn(` Rental with ID ${req.body.rentalid} not found`);
            } else {
                console.log(` Rental deleted: ${req.body.rentalid}`);
            }
        }


        res.status(200).json(bookingDetails);

    } catch (error) {
        console.error("Error from creating booking router:", error);
        res.status(500).json({ error: "Booking failed" });
    }
});


// find customer booking with user id
router.get('/customer-booking/:ID', VerifyToken, async (req, res) => {
    try {
        var Bookingdata = await bookingSchema.find({ userid: req.params.ID })
        res.status(200).json(Bookingdata)

    } catch (error) {
        console.log("Error from custumer booking details router", error);
        res.status(500).json(error)

    }
})

// Update booking status
router.put('/update-status/:bookingId', VerifyToken, async (req, res) => {
    try {
        const { status } = req.body;
        const updatedBooking = await bookingSchema.findByIdAndUpdate(
            req.params.bookingId,
            { status },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        res.status(200).json({ message: 'Status updated successfully', data: updatedBooking });
    } catch (error) {
        console.error("Error updating booking status:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Customer feedback update 
router.put('/add-feedback/:bookingId', VerifyToken, async (req, res) => {
    try {
        const { feedback } = req.body;

        const booking = await bookingSchema.findByIdAndUpdate(
            req.params.bookingId,
            { feedback },
            { new: true }
        );

        if (!booking) return res.status(404).json({ message: 'Booking not found' });

        res.status(200).json({ message: 'Feedback saved successfully' });

    } catch (error) {
        console.log("Error saving feedback:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



module.exports = router