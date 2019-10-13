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
import { generateErrorMessage } from '../../utils/generateErrorMessage';
import { addSnackbar } from '../snackbar/sanckbar.action';
import { generateSnackbar } from '../../utils/generateSnackbar';
import { SnackbarTypes } from '../../interfaces/snackbar';

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
    const response = yield call(fetchGetAllPokemon);
    yield put(getAllPokemonSucceeded(response.data));
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(getAllPokemonFailed());
  }
}

export function* getPokemonByIdSaga(
  action: GetPokemonByIdRequestedAction,
): SagaIterator {
  try {
    const response = yield call(fetchGetPokemonById, action.id);
    yield put(getPokemonByIdSucceeded(response.data));
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(getPokemonByIdFailed());
  }
}
