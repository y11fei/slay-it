const config = require('./utils/config');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

const postsRouter = require('./controllers/posts');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const commentsRouter = require('./controllers/comments');

console.log('connecting to', config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

app.use(cors());
app.use(express.static('build'));

app.use(express.json());

app.use('/api/login', loginRouter);
app.use('/api/posts', postsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);

module.exports = app;
