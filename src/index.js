import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Parity from './components/Parity';
import NumbersHalf from './models/NumbersHalf';
import LettersHalf from './models/LettersHalf';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Parity
      LeftHalf={NumbersHalf}
      RightHalf={LettersHalf}
    />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
