import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import App from './App';
/**provider makes available the context of the store (of redux) through the child (in this case the App) to be able to dispath actions to that store or pull values of the store*/

import { persistor, store } from './redux/store';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
      
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
