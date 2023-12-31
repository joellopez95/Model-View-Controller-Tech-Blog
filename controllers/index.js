// controllers/index.js

const router = require('express').Router();
const apiRoutes = require('./api');
// route files
const homeRoutes = require('./home-routes');
//const authRoutes = require('./auth-routes');
// route middleware
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
//router.use('/', authRoutes);
module.exports = router;
