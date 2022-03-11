const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
  OrgId: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 150,
  },
  krsNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 10,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events',
    },
  ],
  picture: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Picture',
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Organization', organizationSchema);
