// models/index.js

const Post = require('./Blog');
const User = require('./Person');
// Define associations
User.hasMany(Post, {
  foreignKey: 'UserId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'UserId',
});



module.exports = {
  Post,
  User,
};
