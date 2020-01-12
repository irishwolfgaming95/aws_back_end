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


app.listen(5000, function () {
  console.log('local server active!');
});