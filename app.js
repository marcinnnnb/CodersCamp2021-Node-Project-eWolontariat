const helmet = require('helmet');
const express = require('express');
const app = express();
const eventRouter = require("./api/routes/eventRoutes");
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.use('/events', eventRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });

module.exports = app;