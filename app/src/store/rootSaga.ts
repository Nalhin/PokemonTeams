import { fork, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { pokemonRootSaga } from './pokemon/pokemon.saga';
import { teamRootSaga } from './team/team.saga';
import { userRootSaga } from './user/user.saga';

export function* rootSaga(): SagaIterator {
  yield all([fork(pokemonRootSaga), fork(teamRootSaga), fork(userRootSaga)]);
}
