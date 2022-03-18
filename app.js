const helmet = require('helmet');
const express = require('express');
const swaggerUi = require('swagger-ui-express')
swaggerDocument = require('./swagger.json')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const eventRouter = require("./api/routes/eventRoutes");
const categoryRouter = require("./api/routes/categoriesRoutes");
const pictureRouter = require("./api/routes/pictureRoutes");
const userRouter = require("./api/routes/userRoutes");
const VolunteerRoutes = require('./api/routes/VolunteerRoutes');
const CommentRoutes = require('./api/routes/commentsRoutes');
const Organization = require('./api/routes/organizationRoutes');
const cors = require('cors');

app.use((req, res, next) => {
  const error = new Error('Strona o podanym adresie nie istnieje');
  next();
});

const corsOptions = {
  exposedHeaders: ['Auth-Token'],
  allowedHeaders: ["Accept","Accept-Language","Content-Language",'Auth-Token', "x-requested-with", "authorization", "content-type"],
  origin: '*'
};

app.use('/',cors(corsOptions));
dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI,
    { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, 
      useFindAndModify: false
    })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use('/volunteer', VolunteerRoutes, cors(corsOptions));
app.use('/comments', CommentRoutes, cors(corsOptions));
app.use('/user', userRouter, cors(corsOptions));
app.use('/event', eventRouter, cors(corsOptions));
app.use('/category', categoryRouter, cors(corsOptions));
app.use('/picture', pictureRouter, cors(corsOptions));
app.use('/organization', Organization, cors(corsOptions));

app.use(
  '/',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

module.exports = app;
