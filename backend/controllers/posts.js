const postRouter = require('express').Router();
const Post = require('../models/Post');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const Comment = require('../models/Comment');

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

postRouter.get('/', async (request, response) => {
  const posts = await Post.find({}).populate('user', {
    username: 1,
  });

  response.json(posts);
});

postRouter.get('/:id', async (request, response) => {
  const post = await Post.findById(request.params.id).populate('user', {
    username: 1,
  });

  if (post) {
    response.json(post.toJSON());
  } else {
    response.status(404).end();
  }
});

postRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  const post = new Post({
    title: body.title,
    content: body.content,
    hashtag: body.hashtag,
    likes: 0,
    dislikes: 0,
    user: user._id,
    comments: [],
  });

  const savedPost = await post.save();
  user.posts = user.posts.concat(savedPost._id);
  await user.save();

  response.json(savedPost);
});

postRouter.delete('/:id', async (request, response) => {
  await Post.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

postRouter.put('/:id', (request, response, next) => {
  const body = request.body;

  const post = {
    likes: body.likes,
    dislikes: body.dislikes,
    comments: body.comments,
  };

  Post.findByIdAndUpdate(request.params.id, post, { new: true })
    .then((updatedPost) => {
      response.json(updatedPost);
    })
    .catch((error) => next(error));
});

module.exports = postRouter;
