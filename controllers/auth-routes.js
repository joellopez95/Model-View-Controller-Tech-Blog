// controllers/auth-routes.js

const router = require('express').Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Route to display the login form
router.get('/login', (req, res) => {
  res.render('login'); 
});

// Route to handle login logic
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ where: { username } });

    // If the user is not found or the password is incorrect, redirect back to the login page
    if (!user || !bcrypt.compareSync(password, user.password)) {
      res.redirect('/login');
      return;
    }

    // Set the user's ID in the session to maintain login status
    req.session.user_id = user.id;

    // Redirect to the dashboard after successful login
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Route to display the signup form
router.get('/signup', (req, res) => {
  res.render('signup'); 
});

// Route to handle signup logic
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Check if the username already exists
//     const existingUser = await User.findOne({ where: { username } });
//     // If the username already exists, handle the error
//     if (existingUser) {
//    return res.status(400).json({ errorMessage: 'Username is already taken. Choose another username.' });
//  }
    // Hash the password before saving it to the database
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Create a new user in the database
    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    // Set the user's ID in the session to maintain login status
    req.session.user_id = newUser.id;

    // Redirect to the dashboard after successful signup
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
