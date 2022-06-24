const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('posts', {
      title: 1,
      content: 1,
      likes: 1,
      dislikes: 1,
      hashtag: 1,
      comments: 1,
    })
    .populate('comments', {
      content: 1,
      postId: 1,
    });

  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique',
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id);

  if (user) {
    response.json(user.toJSON());
  } else {
    response.status(404).end();
  }
});

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = usersRouter;
