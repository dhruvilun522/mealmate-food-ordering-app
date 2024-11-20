const mongoose = require('mongoose');
require('dotenv').config(); 

const url=process.env.DB_CONN;

const mongoDB=async()=>{
    await mongoose.connect(url,{useNewUrlParser:true},async(err,res)=>{
        if(err) console.log(err);
        else{
            console.log('connected');
            const data=await mongoose.connection.db.collection("fooditems");
            data.find({}).toArray(async function(err,data){
                
                const foodcatagory=await mongoose.connection.db.collection("foodcatagory");
                foodcatagory.find({}).toArray(function(err,catdata){
                    if(err) console.log(err);
                else{
                    global.fooditems=data;
                    global.foodcatagory=catdata;
                }

                })
                
                
                // if(err) console.log(err);
                // else{
                //     global.fooditems=data;
                // }
            })
        }
    });
}

 module.exports = mongoDB;
