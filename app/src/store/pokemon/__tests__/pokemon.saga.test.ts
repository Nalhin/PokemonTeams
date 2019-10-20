import { PokemonActions } from '../pokemon.types';
import { fakePokemon } from '../../../../test/fixtures/pokemon';
import { getAllPokemonSaga, getPokemonByIdSaga } from '../pokemon.saga';
import {
  getAllPokemonFailed,
  getAllPokemonRequested,
  getAllPokemonSucceeded,
  getPokemonByIdFailed,
  getPokemonByIdRequested,
  getPokemonByIdSucceeded,
} from '../pokemon.actions';
import * as pokemonApi from '../pokemon.api';
import { runSaga } from 'redux-saga';
import {
  fakeAxiosError,
  fakeAxiosSuccessResponse,
} from '../../../../test/fixtures/axios';
import { fakeSnackbarErrorAction } from '../../../../test/fixtures/snackbar';

const dispatchedActions: PokemonActions[] = [];
const fakeStore = {
  dispatch: (action: PokemonActions) => dispatchedActions.push(action),
};
const mockId = fakeSnackbarErrorAction.snackbar.id;
jest.mock('lodash/uniqueId', () => () => mockId);

describe('Pokemon Saga', () => {
  beforeEach(() => {
    dispatchedActions.length = 0;
    jest.clearAllMocks();
  });

  it('Should getAllPokemon successfully', async () => {
    const apiMock = jest
      .spyOn(pokemonApi, 'fetchGetAllPokemon')
      .mockResolvedValue({
        ...fakeAxiosSuccessResponse,
        data: [fakePokemon],
      });
    const expectedDispatchedActions = [getAllPokemonSucceeded([fakePokemon])];

    await runSaga(fakeStore, getAllPokemonSaga, getAllPokemonRequested());

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle getAllPokemon errors', async () => {
    const apiMock = jest
      .spyOn(pokemonApi, 'fetchGetAllPokemon')
      .mockRejectedValue({
        ...fakeAxiosError,
      });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      getAllPokemonFailed(),
    ];

    await runSaga(fakeStore, getAllPokemonSaga, getAllPokemonRequested());

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should  getPokemonById successfully', async () => {
    const apiMock = jest
      .spyOn(pokemonApi, 'fetchGetPokemonById')
      .mockResolvedValue({
        ...fakeAxiosSuccessResponse,
        data: fakePokemon,
      });
    const expectedDispatchedActions = [getPokemonByIdSucceeded(fakePokemon)];

    await runSaga(
      fakeStore,
      getPokemonByIdSaga,
      getPokemonByIdRequested(fakePokemon._id),
    );

    expect(apiMock).toHaveBeenCalledWith(fakePokemon._id);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle getPokemonById errors', async () => {
    const apiMock = jest
      .spyOn(pokemonApi, 'fetchGetPokemonById')
      .mockRejectedValue({
        ...fakeAxiosError,
      });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      getPokemonByIdFailed(),
    ];

    await runSaga(
      fakeStore,
      getPokemonByIdSaga,
      getPokemonByIdRequested(fakePokemon._id),
    );

    expect(apiMock).toHaveBeenCalledWith(fakePokemon._id);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });
});
