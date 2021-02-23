import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
<<<<<<< HEAD
import store, {history} from './store'
import {Provider} from 'react-redux'
import { ConnectedRouter } from "connected-react-router";
=======
import store from './store'
import {Provider} from 'react-redux'
>>>>>>> 5748739d08140cb22bd7d6a31a48514da5073396


ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
    ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
