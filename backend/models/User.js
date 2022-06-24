const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  username: {
    type: String,
    minLength: 1,
    required: true,
  },
  passwordHash: {
    type: String,
    minLength: 1,
    required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

global.userSchema = global.userSchema || mongoose.model('User', userSchema);
module.exports = global.userSchema;
