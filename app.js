const helmet = require('helmet');
const express = require('express');
const app = express();
const eventRouter = require("./api/routes/eventRoutes");
const categoryRouter = require("./api/routes/categoryRoutes");
const Event = require("./api/models/eventModel");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const EventController = require('./api/controllers/eventController');
const UserController = require('./api/controllers/userControllers');
const userRouter = require("./api/routes/userRoutes");

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/category', categoryRouter);



module.exports = app;


