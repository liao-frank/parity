import React from 'react';
import ReactDOM from 'react-dom';
import io from 'socket.io-client';
import Parity from './components/Parity';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<Parity
  // leftHalf={}
  // rightHalf={}
/>, document.getElementById('root'));
registerServiceWorker();

const socket = io('http://localhost:6007');
window.socket = socket;

const loggedEvents = [
  'index-links',
  'add-link',
  'delete-link',
  'find-links'
];

for (let event of loggedEvents) {
  socket.on(event, (data) => {
    console.log(event, data);
  });
}
