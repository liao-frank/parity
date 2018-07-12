const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PORT } = require(__dirname + '/config.js');

const LinkRoutes = require(__dirname + '/routes/LinkRoutes.js');


const app = express();

app.use(bodyParser.json()); // for parsing application/json
// logger
app.use(morgan('tiny'));

// require controllers
LinkRoutes(app);

// start server
app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening on port ${PORT}..`);
});
