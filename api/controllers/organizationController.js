const mongoose = require('mongoose');
const Organization = require('../models/organizationModel');
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
