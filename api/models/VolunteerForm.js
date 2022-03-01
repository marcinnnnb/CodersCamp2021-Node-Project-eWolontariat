const mongoose = require('mongoose');
const User


const volunteerSchema = new mongoose.Schema({
    VolId: mongoose.Schema.Types.ObjectId,
    categories: [{
        type: String,
        require: true,
    }],
    description: {
        type: String,
        require: true,
        min:10
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        require: true
    }, //name, login itd from user?
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events"
    }],
    picture: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Picture"
    }],
    
})

module.exports = mongoose.model('Volunteer', volunteerSchema)



