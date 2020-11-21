import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from "react-router-dom";
import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './redux/reducers';
import App from './App';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/apm';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
// eslint-disable-next-line
import './assets/scss/style.scss';
import getUserMediaMiddleware from './middleware/getUserMedia';
import webRTCMiddleware from './middleware/webRTC';
import ScrollToTop from './utils/ScrollToTop';
import {History} from "./utils/History";
Sentry.init({
  dsn: "https://a2b90a79a3a24407b5378d0cb7cb3ac4@o437482.ingest.sentry.io/5400169",
  integrations: [
    new Integrations.Tracing(),
  ],
  tracesSampleRate: 0.1,
});
const sentryReduxEnhancer = Sentry.createReduxEnhancer({
});
let store;
if (process.env.NODE_ENV === 'development') {
  store = createStore(allReducers, compose(applyMiddleware(getUserMediaMiddleware, webRTCMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));
}
else {
  store = createStore(allReducers, compose(applyMiddleware(getUserMediaMiddleware, webRTCMiddleware), sentryReduxEnhancer));
}


ReactDOM.render(
  <Provider store={store}>
    <Router history={History}>
      <ScrollToTop />
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
