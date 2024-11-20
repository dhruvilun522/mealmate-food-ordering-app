const express=require('express')
const router=express.Router()
const user=require('../models/User')
const Order=require('../models/orders.js')
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

router.post('/orders',async (req,res)=>{
    let id = req.body.id;
    console.log(id)
    try{
        
        const u1=await user.findById(id);
        if(!u1){
            return res.status(404).json({ message: 'User not found' });
        }
        const newOrder = new Order({
            userId: u1._id,  // You can extract the user ID from the logged-in user
            items: req.body.items,  // Array of ordered items
            totalPrice: req.body.totalAmount,  // Total price calculated on the frontend
            orderStatus: 'Pending',  // Initially set to 'Pending'
            deliveryAddress: u1.location,  // Example address
            contactInfo: {
                email: u1.email,
            },
        });
        
        // Save the order to the database
        newOrder.save()
            .then(order => {
                console.log('Order saved:', order);
                res.status(200).json({ message: 'Order Placed' ,success:true});
            })
            .catch(error => {
                console.error('Error saving order:', error);
                res.status(400).json({ message: 'try again',success:false });
            });
        
    //     if(!userdata){
    //         return res.status(400).json({ errors: "use correct email id"});
    //     }
    //     const pass=bcrypt.compare(req.body.password,userdata.password);
    //     if(!pass){
    //         return res.status(400).json({ errors: "use correct password"});
    //     }
    //     const data={
    //         user:{
    //             id:userdata.id
    //         }
    //     }
    //     const token=jwt.sign(data,secr);
    //     return res.json({success:true,authToken:token});
    }
    catch(error){
        console.log(error);
        res.json({success:false})
    }
})

router.post('/my_orders', async (req, res) => {
    try {
      const orders = await Order.find({ id: req.body.id }) // Assuming `req.user.id` is the logged-in user's ID
        .sort({ orderDate: -1 }) // Sort by order date (most recent first)
        .exec();
        //console.log(orders)
      res.send(orders)
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).send('Error fetching orders');
    }
  });

module.exports=router;