const mongoose = require('mongoose');


const categoriesSchema = new mongoose.Schema({
    name:{
        type:String,
    unique:true},
    color: {
        type: String
    }, 
    icon:{
        type: String
    }  
})

module.exports = mongoose.model('Category', categoriesSchema)

