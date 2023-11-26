// server.js

const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); 
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const app = express();
const PORT = process.env.PORT || 3001;

// Set up session
const sess = {
  secret: 'top secret', // Change this to a secure, random string
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// Set up Handlebars.js engine
app.engine('handlebars', exphbs({ helpers, defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in the controllers
app.use(routes);

// Sync Sequelize models to the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
