const helmet = require('helmet');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const eventRouter = require("./api/routes/eventRoutes");
const categoryRouter = require("./api/routes/categoriesRoutes");
const pictureRouter = require("./api/routes/pictureRoutes");
const userRouter = require("./api/routes/userRoutes");
const VolunteerRoutes= require('./api/routes/VolunteerRoutes');
const CommentRoutes= require('./api/routes/commentsRoutes');
const cors = require('cors');


app.use((req, res, next) => {
  const error = new Error('Strona o podanym adresie nie istnieje');
  next()
});
app.use(cors());
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
app.use('/volunteer', VolunteerRoutes, cors());
app.use('/comments', CommentRoutes, cors());
app.use('/user', userRouter, cors());
app.use('/event', eventRouter, cors());
app.use('/category', categoryRouter, cors());
app.use('/picture', pictureRouter, cors());

module.exports = app;


