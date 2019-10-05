import { fork, all } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { pokemonRootSaga } from './pokemon/pokemon.saga';

export function* rootSaga(): SagaIterator {
  yield all([fork(pokemonRootSaga)]);
}
