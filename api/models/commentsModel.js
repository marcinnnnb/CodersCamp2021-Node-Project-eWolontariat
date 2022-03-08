const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true
    }, 
    content: {
        type: String,
        require: true
    },
    date:{
        type: Date, 
        default: Date.now
<<<<<<< HEAD
=======
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    volunteer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Volunteer'
>>>>>>> 8c32bf2c8598fa670b582ace7664c6e917304c63
    }
})

module.exports = mongoose.model('Comment', commentSchema)

