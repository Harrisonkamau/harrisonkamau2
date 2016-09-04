// require needed modules
var express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');

// create express app
var app = express();

// configure path
app.use(express.static(path.join(__dirname, 'public')));

// connect home route to index.html
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

// handling the contact post request
app.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport, I chose gmail. Create an application-specific password to avoid problems.
  smtpTrans = nodemailer.createTransport('SMTP', {
      service: 'Gmail',
      auth: {
          user: "kamauharrison87@gmail.com",
          pass: "harrykey_2016!"
      }
  });
  //Mail options
  mailOpts = {
      from: req.body.name + ' &lt;' + req.body.email + '&gt;', //grab form data from the request body object
      to: 'kamauharrison87@gmail.com',
      subject: 'Website contact form',
      text: req.body.message
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Error occured, message not sent.', err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { title: 'Raging Flame Laboratory - Contact', msg: 'Message sent! Thank you.', err: false, page: 'contact' })
      }
  });
});

// start the server
app.listen(process.env.PORT || 3000, () =>{
  console.log("server running on port 3000");
})
