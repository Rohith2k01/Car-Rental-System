const router = require('express').Router()
const adminSchema = require('../models/AdminSchema')
const crypto = require('crypto-js')
const JWT = require('jsonwebtoken')
const CarSchema = require('../models/CarSchema')
const BookingSchema = require('../models/BookingSchema')


// admin signup router
router.post('/Signup', async(req,res)=>{
    console.log(req.body);
    
    try{
        var password= crypto.AES.encrypt(req.body.password, process.env.passkey).toString()
        
        var newAdmin = new adminSchema({
            email:req.body.email,
            password:password
        })
        await newAdmin.save()
        res.status(201).json({message: 'new Admin added'})
        

    }catch(error){
        
        res.status(500).json(error)
        
    }
})

// admin login router
router.post('/Login', async (req,res)=>{
    console.log(req.body);
    
    try{
        // finding the document using email
        var FindedAdmin = await adminSchema.findOne({email: req.body.Email})
        if(FindedAdmin){
            
            // converting encrypted password to bytes
            var bytes = crypto.AES.decrypt(FindedAdmin.password,process.env.passkey)
            console.log(bytes);

            // converting bytes to string original password
            var originalPassword = bytes.toString(crypto.enc.Utf8)

            // checking the stored password and sended password are equal
            if(originalPassword == req.body.Password){
                
                // jwt token creating using _id and tokenkey
                var Token = JWT.sign({id: FindedAdmin._id}, process.env.tokenkey,{expiresIn:'10d'})
                console.log(Token);
                

                res.status(200).json({Token, Id: FindedAdmin._id})
            }else{
                res.status(404).json({message:"email is incorrect"})
            }
            
            
            
        }else{
            res.status(404).json({message:'Email is incorrect'})
        }

    }catch(error){
        console.log("error from admin login", error);
        res.status(500).json(error)
        
    }

})

// find all car details
router.get('/all-cars',async(req,res)=>{
    try{
        var Cardata = await CarSchema.find()
        res.status(200).json(Cardata)

    }catch(error){
        console.log("Error from admin all car router", error);
        res.status(500).json(error)
        
    }
})

// Admin approval car router
router.put('/approve/:id', async (req, res) => {
  const { isApproved } = req.body; // true or false

  try {
    const updatedCar = await CarSchema.findByIdAndUpdate(
      req.params.id,
      { isApproved }, // update to true or false
      { new: true }
    );
    res.status(200).json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: 'Approval update failed', error: err });
  }
});

// find all customer booking 
router.get('/customer-booking', async (req, res) => {
    try {
        var Bookingdata = await BookingSchema.find()
        res.status(200).json(Bookingdata)

    } catch (error) {
        console.log("Error from admin customer booking details router", error);
        res.status(500).json(error)

    }
})

// Customer feedback
router.get('/all-feedbacks', async (req, res) => {
  try {
    const feedbacks = await bookingSchema.find({ feedback: { $ne: '' } });
    res.status(200).json(feedbacks);
  } catch (err) {
    console.log('Error fetching feedbacks:', err);
    res.status(500).json({ error: 'Failed to get feedbacks' });
  }
});




module.exports = router