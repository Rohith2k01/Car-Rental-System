const router = require('express').Router()
const vendorSchema = require('../models/VendorSchema')
const crypto = require('crypto-js')
var JWT = require('jsonwebtoken')
const carSchema = require('../models/CarSchema')
const VerifyToken = require('../TokenVerification')
const BookingSchema = require('../models/BookingSchema')

router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        var checkEmail = await vendorSchema.findOne({ email: req.body.Email })
        if (checkEmail) {
            return res.status(299).json({ message: "Already have an acount please login to continue" })
        } else {

            var password = crypto.AES.encrypt(req.body.Password, process.env.passkey)
            const newVendor = new vendorSchema({
                password: password,
                email: req.body.Email,
                phone: req.body.Phone,
                fullname: req.body.FullName
            })
            await newVendor.save()
            res.status(200).json({ message: 'New Acount created 🎉' })
        }

    } catch (error) {
        console.log("Error From Vendor Signup", error);
        res.status(500).json(error)
    }
})

// user login router

router.post('/Login', async(req,res)=>{
    try{
        const findVendor = await vendorSchema.findOne({email:req.body.Email})
        console.log(findVendor);
        
        if(!findVendor){
            console.log('helo');
            
            return res.status(404).json({message:"Email is incorrect"})
        }else{
            const bytes = crypto.AES.decrypt(findVendor.password, process.env.passkey)
            var originalPassword = bytes.toString(crypto.enc.Utf8)
            if(req.body.Password == originalPassword){
                var Token = JWT.sign({id:findVendor._id}, process.env.tokenkey, {expiresIn:'10d'})
                res.status(200).json({Token, id:findVendor._id})

            }else{
                return res.status(404).json({message:"Password is incorrect"})
            }
        }

    }catch(error){
        console.log("Error from vendor Login",error);
        res.status(500).json(error)
        

    }
})

// find car with vendor id
router.get('/vendor-cars/:ID',VerifyToken,async(req,res)=>{
    try{
        var Cardata = await carSchema.find({userid: req.params.ID})
        res.status(200).json(Cardata)

    }catch(error){
        console.log("Error from vendo car router", error);
        res.status(500).json(error)
        
    }
})

// PUT /vendor/update-availability/:id
router.put('/update-availability/:id', async (req, res) => {
  const { isAvailable } = req.body;
  try {
    const updatedCar = await carSchema.findByIdAndUpdate(
      req.params.id,
      { isAvailable },
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (error) {
    console.error("Error updating availability", error);
    res.status(500).json({ message: 'Update failed', error });
  }
});

// find customer booking with vendor id
router.get('/customer-booking/:ID', VerifyToken, async (req, res) => {
    try {
        var Bookingdata = await BookingSchema.find({ vendorId: req.params.ID })
        res.status(200).json(Bookingdata)

    } catch (error) {
        console.log("Error from custumer booking details router", error);
        res.status(500).json(error)

    }
})


module.exports = router