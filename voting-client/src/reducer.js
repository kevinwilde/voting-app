import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  const round = state.getIn(['vote', 'round']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('myVote', Map({round, entry}));
  } else {
    return state;
  }
}

function resetVote(state) {
  const votedForRound = state.getIn(['myVote', 'round']);
  const curRound = state.getIn(['vote', 'round']);
  if (votedForRound !== curRound) {
    return state.remove('myVote');
  } else {
    return state;
  }
}

function reducer(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  }
  return state;
}

export default reducer;
