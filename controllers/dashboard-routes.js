// controllers/dashboard-routes.js
//boilerplate code from previous examples/mini project
const router = require('express').Router();
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');

// Route to get all user's posts for the dashboard
router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      user: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to get a specific post by ID for editing
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    if (!postData) {
      res.status(404).json({ message: 'Post not found' });
      return;
    }

    const post = postData.get({ plain: true });

    res.render('edit-post', {
      post,
      user: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to display user profile
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});
// Route to create a new post
router.get('/create', withAuth, (req, res) => {
  res.render('new-post', {
    user: req.session.user_id,
  });
});

module.exports = router;

