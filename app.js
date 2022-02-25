const helmet = require('helmet');
const express = require('express');
const app = express();

app.use((req, res, next) => {
  const errpr = new Error('Strona o podanym adresie nie istnieje');
});
