// models/post.js
//code from earlier activities
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // Foreign key to the User model
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Users', // Make sure this matches your actual User model name
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Post',
  }
);

module.exports = Post;
