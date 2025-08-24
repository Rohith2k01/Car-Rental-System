const CarSchema = require('../models/CarSchema');
const RentalSchema = require('../models/RentalSchema');
const VerifyToken = require('../TokenVerification');

var router = require('express').Router()

// adding new car to rental
router.post('/Add-Rental', VerifyToken, async (req, res) => {
    try {
        console.log(req.body);

        // Get car data from DB to get vendor info
        const carDoc = await CarSchema.findById(req.body.rental._id);
        if (!carDoc) {
            return res.status(404).json({ message: 'Car not found' });
        }

        newRental = new RentalSchema({
            carID: req.body.rental._id, // Store car's Mongo _id
            carName: req.body.rental.carName,
            carPrice: req.body.rental.carPrice,
            carImage: req.body.rental.carImage,
            userID: req.body.ID,
            vendorId: carDoc.userid,
            vendorName: carDoc.vendorName,
            vendorPhone: carDoc.vendorPhone

        })
        await newRental.save()
        res.status(200).json({ message: 'New Car Added To Rental' })


    } catch (error) {
        console.log("Error from Add to Rental", error);
        res.status(500).json(error)

    }
})

// collecting rental car using user id
router.get('/Collect-rental-data/:ID', VerifyToken, async (req, res) => {
    try {
        var rentalData = await RentalSchema.find({ userID: req.params.ID }).populate('userID')
        console.log(rentalData);
        res.status(200).json(rentalData)


    } catch (error) {
        console.log("Error from cart product collecting", error);
        res.status(500).json(error)

    }
})

module.exports = router