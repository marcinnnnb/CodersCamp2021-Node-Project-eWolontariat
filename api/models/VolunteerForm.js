const mongoose = require('mongoose');


const volunteerSchema = new mongoose.Schema({
    VolId: mongoose.Schema.Types.ObjectId,
    categories: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        // require: true
    }, //name, login itd from user?
    
})

module.exports = mongoose.model('Volunteer', volunteerSchema)



