// require needed modules
var express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');
var bodyParser = require('body-parser');

// create express app
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// set app configurations
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// set render engine
app.engine('.html', require('ejs').renderFile);
// connect home route to index.html
app.get('/', function(req, res){
  res.res(path.join(__dirname, 'index.html'));
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
          res.render('contact',{ err: true, page: 'contact' })
      }
      //Yay!! Email sent
      else {
          res.render('contact', { err: false, page: 'contact' })
      }
  });
});

// start the server
app.listen(process.env.PORT || 3000, () =>{
  console.log("server running on port 3000");
})
