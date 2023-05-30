const express=require('express')
const router=express.Router()
const user=require('../models/User')
const { body, validationResult } = require('express-validator');

const bcrypt=require("bcrypt")
const jwt=require('jsonwebtoken');
const secr="SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

router.post('/createuser',body('email').isEmail(),
body('password',"invalid password").isLength({ min: 5 }),async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt=await bcrypt.genSalt(10);
    let secpass=await bcrypt.hash(req.body.password,salt);

    try{
        await user.create({
            name:req.body.name,
            password:secpass,
            email:req.body.email,
            location:req.body.location
        })
        res.json({success:true})
    }
    catch(error){
        console.log(error);
        res.json({success:false})
    }
})

router.post('/loginuser',async (req,res)=>{
    let email = req.body.email;
    try{
        let userdata = await user.findOne({email});
        if(!userdata){
            return res.status(400).json({ errors: "use correct email id"});
        }
        const pass=bcrypt.compare(req.body.password,userdata.password);
        if(!pass){
            return res.status(400).json({ errors: "use correct password"});
        }
        const data={
            user:{
                id:userdata.id
            }
        }
        const token=jwt.sign(data,secr);
        return res.json({success:true,authToken:token});
    }
    catch(error){
        console.log(error);
        res.json({success:false})
    }
})

module.exports=router;