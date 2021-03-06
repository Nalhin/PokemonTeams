import { all, fork } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { pokemonRootSaga } from './pokemon/pokemon.saga';
import { teamRootSaga } from './team/team.saga';
import { authorizeUserSaga, userRootSaga } from './user/user.saga';
import { modalRootSaga } from './modal/modal.saga';

function* initSaga(): SagaIterator {
  yield all([fork(authorizeUserSaga)]);
}

export function* rootSaga(): SagaIterator {
  yield all([
    fork(pokemonRootSaga),
    fork(teamRootSaga),
    fork(userRootSaga),
    fork(initSaga),
    fork(modalRootSaga),
  ]);
}
