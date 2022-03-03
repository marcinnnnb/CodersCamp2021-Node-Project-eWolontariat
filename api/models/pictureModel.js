const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    name: String,
    desc: String,
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