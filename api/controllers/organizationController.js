const mongoose = require('mongoose');
const Organization = require('../models/organizationModel');
const User = require('../models/userModel');
const url = require('url');

// Get one organization

exports.getOneOrganization = async (req, res) => {
  // res.send('test');
  let organizationById;
  try {
    organizationById = await Organization.findById(req.params.id).catch((error) => {
      res.status(404);
      throw new Error('Podana organizacja nie istnieje');
    });
    if (organizationById == null) {
      res.status(404);
      throw new Error('Podana organizacja nie istnieje');
    }
  } catch (error) {
    return res.json({ message: error.message });
  }
  return res.send(organizationById);
};

// Get all organizations

exports.getAllOrganizations = async (req, res, next) => {
  const results = await Organization.find();
  res.send(results);
};

// Create organization

exports.createOrganization = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const organizationCreate = new Organization({
      owner: req.user,
      name: req.body.name,
      description: req.body.description,
      krsNumber: req.body.krsNumber,
    });
    const newOrganization = await organizationCreate.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update organization

exports.updateOrganization = async (req, res) => {
  try {
    const updatedOrganization = await Organization.findOneAndUpdate(
      { _id: req.params.id },
      {
        descritpion: req.body.description,
        krsNumber: req.body.krsNumber,
        events: req.body.events,
      },
      { new: true }
    )
      .exec()
      .catch((error) => {
        res.status(404);
        throw new Error('Podana organizacja nie istnieje');
      });

    if (!updatedOrganization) {
      res.status(404);
      throw new Error('Podana organizacja nie istnieje');
    }
    res.status(200).json({ data: updatedOrganization });
  } catch (error) {
    res.send({ message: error.message });
  }
};

// Get events
exports.getOneOrganizationEvents = async (req, res) => {
  let organizationById;
  let organizationEvents;
  try {
    console.log(req.params.id)
    organizationById = await Organization.findOne({ _id: req.params.id })
      .populate('events')
      .catch((error) => {
        res.status(404);
        throw new Error('Podana organizacja nie istnieje');
      });
    if (organizationById == null) {
      res.status(404);
      throw new Error('Podana organizacja nie istnieje');
    }
    organizationEvents = organizationById.events || [];
  } catch (error) {
    return res.json({ message: error.message });
  }
  console.log(organizationById.events);
  return res.send(organizationEvents);
};
