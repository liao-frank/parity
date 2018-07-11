const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { PORT } = require(__dirname + '/config.js');

const app = express();

// logger
app.use(morgan('tiny'));

// require controllers


// start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening on port ${PORT}..`);
});
