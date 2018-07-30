const path = require('path');
const os = require('os');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {
  PORT,
  USE_WEBSOCKETS
} = require(__dirname + '/config.js');

const LinkSockets = require(__dirname + '/sockets/LinkSockets.js');


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, {
  transports: USE_WEBSOCKETS ? ['polling', 'websocket'] : ['polling']
});
io.set('origins', '*:*');


app.use(express.static(path.join(__dirname, '..', 'build')));

// logger
app.use(morgan('tiny'));

// sockets
io.on('connection', (socket) => {
  LinkSockets(socket);
});

// start server
const ifaces = os.networkInterfaces();
server.listen(PORT, '0.0.0.0');
let networkAddress;

for (let iface of ifaces.en0) {
  if (iface.family === 'IPv4') {
    networkAddress = iface.address;
  }
}
console.log('You are now running a local parity service.');
console.log('');
console.log(`  Local:            http://localhost:${PORT}/`);
if (networkAddress) {
  console.log(`  On Your Network:  http://${networkAddress}:${PORT}/`);
}
console.log('');
console.log('');
