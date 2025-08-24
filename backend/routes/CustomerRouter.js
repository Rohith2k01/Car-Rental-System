const router = require('express').Router()
const customerSchema = require('../models/CustomerSchema')
const crypto = require('crypto-js')
var JWT = require('jsonwebtoken')
const CarSchema = require('../models/CarSchema')

router.post('/signup', async (req, res) => {
    console.log(req.body);
    try {
        var checkEmail = await customerSchema.findOne({ email: req.body.Email })
        if (checkEmail) {
            return res.status(299).json({ message: "Already have an acount please login to continue" })
        } else {

            var password = crypto.AES.encrypt(req.body.Password, process.env.passkey)
            const newCustomer = new customerSchema({
                password: password,
                email: req.body.Email,
                phone: req.body.Phone,
                fullname: req.body.FullName
            })
            await newCustomer.save()
            res.status(200).json({ message: 'New Acount created 🎉' })
        }

    } catch (error) {
        console.log("Error From Customer Signup", error);
        res.status(500).json(error)
    }
})

// user login router
router.post('/Login', async(req,res)=>{
    try{
        const findCustomer = await customerSchema.findOne({email:req.body.Email})
        console.log(findCustomer);
        
        if(!findCustomer){
            console.log('helo');
            
            return res.status(404).json({message:"Email is incorrect"})
        }else{
            const bytes = crypto.AES.decrypt(findCustomer.password, process.env.passkey)
            var originalPassword = bytes.toString(crypto.enc.Utf8)
            if(req.body.Password == originalPassword){
                var Token = JWT.sign({id:findCustomer._id}, process.env.tokenkey, {expiresIn:'10d'})
                res.status(200).json({Token, id:findCustomer._id})

            }else{
                return res.status(404).json({message:"Password is incorrect"})
            }
        }

    }catch(error){
        console.log("Error from Customer Login",error);
        res.status(500).json(error)
        

    }
})

// Customer approved Cars
router.get('/approved-cars', async (req, res) => {
  try {
    const approvedCars = await CarSchema.find({ isApproved: true });
    res.status(200).json(approvedCars);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch approved cars' });
  }
});


module.exports = router