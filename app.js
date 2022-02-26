const helmet = require('helmet');
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use((req, res, next) => {
  const errpr = new Error('Strona o podanym adresie nie istnieje');
});

mongoose.set('useUnifiedTopology', true);
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Connection failed', error);
  });
