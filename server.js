const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

const logger = require('morgan');
app.use(logger('dev'));

const mailer = require('express-mailer');
 
mailer.extend(app, {
  from: 'no-reply@example.com',
  host: 'smtp.gmail.com', // hostname
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'valkyire8@gmail.com',
    pass: ''
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(upload.array());

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use( function(req, res, next) {

  if (req.originalUrl && req.originalUrl.split("/").pop() === 'favicon.ico') {
    return res.sendStatus(204);
  }

  return next();

});


app.post('/mail', function (req, res, next) {
  console.log('body',req.body);
  app.mailer.send('email', {
    to: 'valkyire8@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Test Email', // REQUIRED.
    name: req.body.name,
    email: req.body.email,
    message: req.body.message // All additional properties are also passed to the template as local variables.
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      res.send('There was an error sending the email');
      return;
    }
    res.send('Email Sent');
  });
});


app.listen(5000, function () {
  console.log('local server active!');
});