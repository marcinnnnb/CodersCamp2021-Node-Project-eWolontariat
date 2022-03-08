const mongoose = require('mongoose');
const { Schema } = mongoose;

const eventSchema = new mongoose.Schema({
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    organization: { 
        type: Schema.Types.ObjectId, 
        ref: 'Organization' 
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    shortDescription: {
        type: String,
        maxLength: 200,
        //default: this.description.slice(0,100).concat("..."),
        trim: true
    },
    dateStarted: {
        type: Date,
        default: Date.now
    },
    dateExpired: {
        type: Date,
        default: null
    },
    volunteers: [{
        type: Schema.Types.ObjectId,
        ref: "Volunteer"
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: "Category"
    }], 
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }],
    volunteersNeeded: {
        type: Number,
        required: true
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    isSucceeded: {
        type: Boolean,
        default: false
    },
    picture: {
        type: Schema.Types.ObjectId,
        ref: "Picture"
    }
})

module.exports = mongoose.model('Event', eventSchema);