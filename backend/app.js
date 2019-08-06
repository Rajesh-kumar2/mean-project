//express app is a big chain of middlewares
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoutes = require('./routes/posts');
const path = require('path');

const app = express();

mongoose
  .connect(
    'mongodb+srv://rajdatheist:51S6YEvVe3YLFuzM@cluster0-ucmha.mongodb.net/mean?retryWrites=true&w=majority',
    { useNewUrlParser: true }
  )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, DELETE, PATCH, OPTIONS, PUT'
  );
  next();
});

app.use('/api/posts', postRoutes);

module.exports = app;
