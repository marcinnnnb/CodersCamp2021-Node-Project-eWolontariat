const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    VolId: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        // require: true
    }, 
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    }],
    description: {
        type: String,
        require: true,
        min:10
    },
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

module.exports = mongoose.model('Volunteer', volunteerSchema);



