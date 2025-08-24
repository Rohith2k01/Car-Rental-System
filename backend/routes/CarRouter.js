const router = require('express').Router()
const carSchema = require('../models/CarSchema')
const multer = require('multer')
const path = require('path')
const VerifyToken = require('../TokenVerification')

const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const VendorSchema = require('../models/VendorSchema')

// Configure multer storage to use Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'car_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Route to add car
router.post('/Add-Car-Token', VerifyToken, upload.single('carImage'), async (req, res) => {
  try {
    const carImageUrl = req.file.path; // Cloudinary gives a secure URL

     // Fetch vendor details
    const vendor = await VendorSchema.findById(req.userId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const newCar = new carSchema({
      userid: req.userId,
      vendorName: vendor.fullname,
      vendorPhone: vendor.phone,
      carImage: carImageUrl,
      carName: req.body.carName,
      carSeat: req.body.carSeat,
      carMileage: req.body.carMileage,
      carPrice: req.body.carPrice,
      carDis: req.body.carDis,
    });

    await newCar.save();
    res.status(200).json({ message: 'New Car Added' });
  } catch (error) {
    console.error('Error from new car adding', error);
    res.status(500).json(error);
  }
});

module.exports= router