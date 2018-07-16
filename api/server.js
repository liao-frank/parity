const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { PORT, USE_WEBSOCKETS } = require(__dirname + '/config.js');

const LinkSockets = require(__dirname + '/sockets/LinkSockets.js');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  transports: USE_WEBSOCKETS ? ['polling', 'websocket'] : ['polling']
});
io.set('origins', 'http://localhost:*');


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

// logger
app.use(morgan('tiny'));

// sockets
io.on('connection', (socket) => {
  LinkSockets(socket);
});

// start server
server.listen(PORT);
