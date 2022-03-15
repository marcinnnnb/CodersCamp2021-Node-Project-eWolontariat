const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    VolId: mongoose.Schema.Types.ObjectId,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        // require: true
    }, 
    firstName: {
        type: String,
        require: true,
        min:10
    },
    lastName: {
        type: String,
        require: true,
        min:10
    },
    categories: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Category"
    },
    description: {
        type: String,
        require: true,
        min:10
    },
    shortDescription: {
        type: String,
        maxLength: 200,
        default: function() {
            return (this.description.slice(0,40).concat("..."));
        },
        trim: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    events: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events"
    }],
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Picture"
    },
    picture: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Picture"
    }],
    rate: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rate"
    }],
    averageRate:{
        type:Number
    }
    
})

module.exports = mongoose.models.Volunteer || mongoose.model('Volunteer', volunteerSchema)



