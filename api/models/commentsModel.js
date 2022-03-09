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
    }
})

module.exports = mongoose.model('Comment', commentSchema)

