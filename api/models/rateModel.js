const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema({
    
    rate: {
        type: Number,
        min:0,
        max:5
    }, 
   
})

module.exports = mongoose.models.Rate || mongoose.model('Rate', rateSchema)