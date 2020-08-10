import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import {createStore, applyMiddleware,compose} from 'redux';
import allReducers from './redux/reducers';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';

//import './App.css';
import './assets/scss/style.scss';
import getUserMediaMiddleware from './middleware/getUserMedia';
import webRTCMiddleware from './middleware/webRTC';

const store = createStore(allReducers,compose(applyMiddleware(getUserMediaMiddleware,webRTCMiddleware),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
