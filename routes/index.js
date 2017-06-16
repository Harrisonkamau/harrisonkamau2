

// Node dependencies
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const config = require('../config/config');

// send grid options
const sendGridOptions = {
  auth: {
    api_user: config.API_USERNAME,
    api_key: config.API_KEY
  }
};

// configure nodemailer client
var client = nodemailer.createTransport(sgTransport(sendGridOptions));

// routes
// Home route
router.get('/', (req, res) => {
  res.render('index');
})

router.get('/contact', (req, res) => {
  res.send('reply');
})

// Subscribe to blog
router.post('/contact', (req, res) => {
  // Email object
  let email = {
    from: req.body.email,
    to: 'andynelson629@gmail.com',
    subject: req.body.subject,
    html: req.body.message
  };

  return _send(email, res.render('reply'));

})

// Private Helper function to send emails
function _send(obj, callback) {
  client.sendMail(obj, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      return callback;
    }
  })

}

// modules for export
module.exports = router;