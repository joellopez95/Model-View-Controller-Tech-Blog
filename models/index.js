// models/index.js

const Comment = require('./comment');
const Post = require('./post');
const User = require('./user');

// Define associations
User.hasMany(Post, {
  foreignKey: 'UserId',
});

Post.belongsTo(User, {
  foreignKey: 'UserId',
});

Post.hasMany(Comment, {
  foreignKey: 'PostId',
});

Comment.belongsTo(User, {
  foreignKey: 'UserId',
});

Comment.belongsTo(Post, {
  foreignKey: 'PostId',
});

module.exports = {
  Comment,
  Post,
  User,
};
