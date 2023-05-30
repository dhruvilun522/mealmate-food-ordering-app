const express=require('express')
const router=express.Router()

router.post('/fooddata',(req,res)=>{
    try {
        res.send([global.fooditems,global.foodcatagory])
    } catch (error) {
        console.log(error)
        res.send("srever error");
    }
})

module.exports=router;