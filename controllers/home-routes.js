// controllers/home-routes.js
//boilerplate code from previous examples/mini project
const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// Route to get all posts for the homepage
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'createdAt', 'UserId'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('homepage', {
      posts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to get a specific post by ID
router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['content', 'createdAt', 'UserId'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('singlepost', {
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
