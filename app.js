const helmet = require('helmet');
const express = require('express');
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')
//const swaggerJsDoc = require('swagger-jsdoc')
const eventRouter = require("./api/routes/eventRoutes");
const categoryRouter = require("./api/routes/categoryRoutes");
const Event = require("./api/models/eventModel");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const EventController = require('./api/controllers/eventController');
const UserController = require('./api/controllers/userControllers');
const userRouter = require("./api/routes/userRoutes");

const port = process.env.PORT || 3000;

/*const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title:"e-Wolontariat API",
      version: "1.0.0",
      description: "Aplikacja pomagająca w znalezieniu wolontariuszy."
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ],
  },
  apis:["./api/routes/*.js"]
}

//const specs = swaggerJsDoc(options)*/

const app = express();

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);


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

app.listen(port, () => console.log(`Listening on port ${port}...`));

//module.exports = app;


