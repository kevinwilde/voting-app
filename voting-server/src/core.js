import {List, Map} from 'immutable';

const INITIAL_STATE = Map();

function setEntries(state, entries) {
    return state.set('entries', List(entries));
}

function next(state) {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote')
                    .remove('entries')
                    .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({
                round: state.getIn(['vote', 'round'], 0) + 1,
                pair: entries.take(2)
            }),
            entries: entries.skip(2)
        });
    }
}

function getWinners(vote) {
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);
    if      (aVotes > bVotes)  return [a];
    else if (aVotes < bVotes)  return [b];
    else                       return [a, b];
}

function vote(voteState, entry, voter) {
    return addVote(removeVote(voteState, voter), entry, voter);
}

function addVote(voteState, entry, voter) {
    if (!voteState.get('pair').includes(entry)) {
        return voteState;
    }
    return voteState.updateIn(['tally', entry], 0, tally => tally + 1)
                    .setIn(['votes', voter], entry);
}

function removeVote(voteState, voter) {
    const previousVote = voteState.getIn(['votes', voter]);
    if (!previousVote) {
        return voteState;
    }
    return voteState.updateIn(['tally', previousVote], tally => tally - 1)
                    .removeIn(['votes', voter], )
}

export {
    INITIAL_STATE,
    setEntries,
    next,
    vote
};
