const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

// Create express app
const app = express();

// local modules
const routes = require('./routes/index');
const config = require('./config/config');

// set default view engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

// set default port
const port = config.PORT || 4000;

// Log routes
app.use(morgan('dev'));

// Service routes
app.use('/', routes);

// Handle all error pages
app.use((req, res) => {
  res.render('errors');
})

// start server
app.listen(port, () => {
  console.log(`Running on http://localhost:${port}`);
})