import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setClientId, setState} from './action_creators';
import remoteActionMiddleware from './remote_action_middleware';
import getClientId from './client_id';
import App from './components/App';
import Results from './components/Results';
import Voting from './components/Voting';

const socket = io(`${location.protocol}//${location.hostname}:9797`);
const createStoreWithMiddleware = applyMiddleware(remoteActionMiddleware(socket))(createStore);
const store = createStoreWithMiddleware(reducer);
store.dispatch(setClientId(getClientId()));

socket.on('state', state =>
  store.dispatch(setState(state))
);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter><App/></HashRouter>
  </Provider>,
  document.getElementById('app')
);
