const mongoose = require('mongoose');


const volunteerSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true
    }, //name, login itd from user?
    content: {
        type: String,
        require: true
    },
    date:{
        type: date
    }
    
})

module.exports = mongoose.model('Comment', commentSchema)

