// require needed modules
var express = require('express');
var nodemailer = require('nodemailer');
var path = require('path');

// create express app
var app = express();

// configure path
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
})
// start the server
app.listen(process.env.PORT || 3000, () =>{
  console.log("server running on port 3000");
})
