const commentRouter = require('express').Router();
const Comment = require('../models/Comment');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

commentRouter.get('/', async (request, response) => {
  const comments = await Comment.find({}).populate('user', {
    username: 1,
  });
  response.json(comments);
});

commentRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const comment = new Comment({
    content: body.content,
    user: user._id,
    postedBy: body.postedBy,
  });

  const savedComment = await comment.save();
  user.comments = user.comments.concat(savedComment._id);
  await user.save();

  response.json(savedComment);
});

commentRouter.delete('/:id', async (request, response) => {
  await Comment.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = commentRouter;
