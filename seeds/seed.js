// seeds/seed.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { Comment, Post, User } = require('../models');

// Import seed data 
const commentData = require('./data/comments.json');
const postData = require('./data/posts.json');
const userData = require('./data/users.json');

// Function to seed the database 
const seedDatabase = async () => {
  // Sync database
  await sequelize.sync({ force: true });

  // Bulk create users with individual hooks for hashing passwords
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Retrieve all users from the database
  const users = await User.findAll();

  // Map over posts data and assign UserIds based on matching usernames
  const postsDataWithUserIds = postData.map((post) => {
    const user = users.find((user) => user.username === post.username);
    console.log('User:', user);
    return {
      ...post,
      UserId: user ? user.id : null,
    };
  });

  // Bulk create posts with associated UserIds
  await Post.bulkCreate(postsDataWithUserIds);

  // get all posts 
  const posts = await Post.findAll();

  // Map over comments data and assign UserIds and PostIds based on matching usernames and post titles
  const commentsDataWithUserIds = commentData.map((comment) => {
    const user = users.find((user) => user.username === comment.username);
    const post = posts.find((post) => post.title === comment.postTitle);

    // Check if both user and post exists
    if (user && post) {
      return {
        ...comment,
        UserId: user.id,
        PostId: post.id,
      };
    } else {
      // Log message if user or post not found 
      console.log(`User or post not found for comment: ${JSON.stringify(comment)}`);
      return null;
    }
  }).filter((comment) => comment !== null);

  // Bulk create comments with associated UserIds and PostIds
  await Comment.bulkCreate(commentsDataWithUserIds);
  console.log('Database seeded successfully!');
};

// Call the seedDatabase 
seedDatabase();
