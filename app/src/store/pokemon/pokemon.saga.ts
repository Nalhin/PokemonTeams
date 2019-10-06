import { put, call, all, takeEvery } from 'redux-saga/effects';
import { fetchGetAllPokemon, fetchGetPokemonById } from './pokemon.api';
import {
  getAllPokemonFailed,
  getAllPokemonSucceeded,
  getPokemonByIdFailed,
  getPokemonByIdSucceeded,
} from './pokemon.actions';
import { SagaIterator } from 'redux-saga';
import {
  GetAllPokemonRequestedAction,
  GetPokemonByIdRequestedAction,
  PokemonActionTypes,
} from './pokemon.types';

export function* pokemonRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(
      PokemonActionTypes.GET_ALL_POKEMON_REQUESTED,
      getAllPokemonSaga,
    ),
    yield takeEvery(
      PokemonActionTypes.GET_POKEMON_BY_ID_REQUESTED,
      getPokemonByIdSaga,
    ),
  ]);
}

export function* getAllPokemonSaga(
  action: GetAllPokemonRequestedAction,
): SagaIterator {
  try {
    const data = yield call(fetchGetAllPokemon);
    yield put(getAllPokemonSucceeded(data));
  } catch (e) {
    yield put(getAllPokemonFailed());
  }
}

export function* getPokemonByIdSaga(
  action: GetPokemonByIdRequestedAction,
): SagaIterator {
  try {
    const data = yield call(fetchGetPokemonById, action.id);
    yield put(getPokemonByIdSucceeded(data));
  } catch (e) {
    yield put(getPokemonByIdFailed());
  }
}
