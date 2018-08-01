import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import Parity from './components/Parity';
import RecipeHalf from './models/RecipeHalf';
import IngredientHalf from './models/IngredientHalf';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Parity
      LeftHalf={RecipeHalf}
      RightHalf={IngredientHalf}
    />
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
