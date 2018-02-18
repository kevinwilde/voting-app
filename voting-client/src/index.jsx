import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import App from './components/App';
import Results from './components/Results';
import Voting from './components/Voting';

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:9797`);
socket.on('state', state =>
  store.dispatch({type: 'SET_STATE', state})
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter><App/></HashRouter>
  </Provider>,
  document.getElementById('app')
);
