const mongoose = require('mongoose');
const { Schema } = mongoose;

const pictureSchema = new mongoose.Schema({
    name: String,
    desc: String,
    owner: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    },
    img:
    {
        data: Buffer
    },
    createdDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Picture', pictureSchema);