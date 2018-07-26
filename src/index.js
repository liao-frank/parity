import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Parity from './components/Parity';
import LeftHalf from './models/LeftHalf';
import RightHalf from './models/RightHalf';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Parity
      LeftHalf={LeftHalf}
      RightHalf={RightHalf}
    />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
