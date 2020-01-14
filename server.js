const express = require('express');
const app = express();

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

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');


app.get('/', function (req, res, next) {
  app.mailer.send('email', {
    to: 'valkyire8@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
    subject: 'Test Email', // REQUIRED.
    otherProperty: 'Other Property' // All additional properties are also passed to the template as local variables.
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