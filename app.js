const helmet = require('helmet');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const eventRouter = require('./api/routes/eventRoutes');
const categoryRouter = require('./api/routes/categoriesRoutes');
const pictureRouter = require('./api/routes/pictureRoutes');
const userRouter = require('./api/routes/userRoutes');
const VolunteerRoutes = require('./api/routes/VolunteerRoutes');
const CommentRoutes = require('./api/routes/commentsRoutes');
const Organization = require('./api/routes/organizationRoutes');

app.use((req, res, next) => {
  const error = new Error('Strona o podanym adresie nie istnieje');
  next();
});

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

app.use(express.json());
app.use('/volunteer', VolunteerRoutes);
app.use('/', CommentRoutes);
app.use('/user', userRouter);
app.use('/event', eventRouter);
app.use('/category', categoryRouter);
app.use('/picture', pictureRouter);
app.use('/organization', Organization);

module.exports = app;
