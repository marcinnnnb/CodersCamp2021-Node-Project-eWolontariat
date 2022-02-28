const helmet = require('helmet');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const VolunteerRoutes= require('./api/routes/VolunteerRoutes')

app.use((req, res, next) => {
  const error = new Error('Strona o podanym adresie nie istnieje');
  next()
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });

  app.use(express.json())
  app.use('/Volunteer', VolunteerRoutes)

module.exports = app;

