const express = require('express');
const User = require('../modles/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchUser= require('../middleware/fetchUser');


const JWT_SECRET= 'myn0te5';



// Rout1: for signUp
router.post('/signup',[
    body('name','enter a valid name').isLength({ min: 3 }),
    body('email','enter a valid email').isEmail(),
    body('password','password must contain atleast 5 characters').isLength({ min: 5 })
], async (req,res)=>{
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try{
    let user = await User.findOne({email:req.body.email});
    if(user){
        return res.status(400).json({success, error:"User with this email already exists"});
    }
    const salt= await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(req.body.password, salt);
   
//    new user create
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: securePass,
      })
      const data= {
          user:{
              id:user.id
          }
      }
    const authToken= jwt.sign(data, JWT_SECRET);
    success= true;
    res.json({success, authToken})
    } catch(error){
        cosole.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})


// Route2: for login
router.post('/login',[
    body('email','enter a valid email').isEmail(),
    body('password','please enter password').exists()
], async (req,res)=>{
    let success= false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email,password}= req.body;
    try {
        let user= await User.findOne({email});
        if(!user){
            success= false;
            return res.status(400).json({error:"Email or password is wrong try login in again"});
        }
        const passCompare= await bcrypt.compare(password, user.password);
        if(!passCompare){
            success= false;
            return res.status(400).json({success, error:"Email or password is wrong try login in again"}); 
        }
        const data= {
            user:{
                id:user.id
            }
        }
    const authToken= jwt.sign(data, JWT_SECRET);
    success= true;
    res.json({success, authToken});
    }catch(error){
        cosole.error(error.message);
        res.status(500).send("Internal server error occured");
    }
    })

   
 // Route3: for get loggedin user data
    router.post('/fetchUser', fetchUser, async (req, res)=>{
    try {
        userId= req.user.id;
       const user= await User.findById(userId).select('-password');
       res.send(user);
    } catch(error){
        cosole.error(error.message);
        res.status(500).send("Internal server error occured");
    }
})

module.exports = router