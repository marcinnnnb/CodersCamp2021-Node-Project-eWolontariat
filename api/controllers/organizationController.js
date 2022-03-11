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
  res.send(reslts);
};

// Create organization

exports.createOrganization = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    const organizationCreate = new Organization({
      user: req.user,
      name: user.name,
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

// Get events - do tego nie wiem jak podejsc?
exports.getOneOrganizationEvents;
