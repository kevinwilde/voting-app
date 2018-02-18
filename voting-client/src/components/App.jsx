import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import {List, Map} from 'immutable';
import {VotingContainer} from './Voting';
import {ResultsContainer} from './Results';

class App extends React.Component {
  render() {
    return (
      <div>
        hello from App
        <Route path="/results" component={ResultsContainer} />
        <Route exact path="/" component={VotingContainer} />
      </div>
      );
  }
}

export default App;
