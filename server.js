const express = require('express');
const app = express();

const logger = require('morgan');
app.use(logger('dev'));



app.listen(5000, function () {
  console.log('local server active!');
});