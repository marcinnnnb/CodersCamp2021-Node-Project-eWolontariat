const Rate = require('../models/rateModel');

 // POST rate
  
 exports.createRate = async (body)=>{
    try{
    const rate = new Rate({
        rate:body.rate
        })
  const newRate=await rate.save()
       return newRate;
  } catch(error) {
    throw new Error(error);
  }
  }