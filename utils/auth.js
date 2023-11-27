// utils/auth.js

const withAuth = (req, res, next) => {
    // If the user is not logged in, redirect to the login page
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  
