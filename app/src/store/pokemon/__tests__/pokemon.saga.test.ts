// import { runSaga } from 'redux-saga';
// import { getAllPokemonSaga, getPokemonByIdSaga } from '../pokemon.saga';
// import {
//   getAllPokemonFailed,
//   getAllPokemonRequested,
//   getAllPokemonSucceeded,
//   getPokemonByIdFailed,
//   getPokemonByIdRequested,
//   getPokemonByIdSucceeded,
// } from '../pokemon.actions';
// import { fakePokemon } from '../../../../test/fixtures/pokemon';
// import { Pokemon } from '../../../interfaces/pokemon';
// import * as api from '../pokemon.api';
// import { PokemonActions } from '../pokemon.types';
//
// jest.mock('../pokemon.api');
// const mocked = api as jest.Mocked<typeof api>;
//
// const dispatchedActions: PokemonActions[] = [];
// const fakeStore = {
//   dispatch: (action: PokemonActions) => dispatchedActions.push(action),
// };
//
// describe('getAllPokemonSaga', () => {
//   const fetchGetAllPokemon = mocked.fetchGetAllPokemon;
//
//   beforeEach(() => {
//     fetchGetAllPokemon.mockClear();
//     dispatchedActions.length = 0;
//   });
//
//   it('Should put getAllPokemonSucceeded with response data', async () => {
//     fetchGetAllPokemon.mockImplementation(
//       (): Promise<Pokemon[]> => Promise.resolve([fakePokemon, fakePokemon]),
//     );
//
//     await runSaga(fakeStore, getAllPokemonSaga, getAllPokemonRequested());
//
//     expect(fetchGetAllPokemon.mock.calls.length).toBe(1);
//     expect(dispatchedActions).toContainEqual(
//       getAllPokemonSucceeded([fakePokemon, fakePokemon]),
//     );
//   });
//
//   it('Should put getAllPokemonFailed when api rejects', async () => {
//     fetchGetAllPokemon.mockImplementation(
//       (): Promise<Pokemon[]> => Promise.reject(),
//     );
//
//     await runSaga(fakeStore, getAllPokemonSaga, getAllPokemonRequested());
//
//     expect(fetchGetAllPokemon.mock.calls.length).toBe(1);
//     expect(dispatchedActions).toContainEqual(getAllPokemonFailed());
//   });
// });
//
// describe('getPokemonByIdSaga', () => {
//   const fetchGetPokemonById = mocked.fetchGetPokemonById;
//
//   beforeEach(() => {
//     fetchGetPokemonById.mockClear();
//     dispatchedActions.length = 0;
//   });
//
//   it('Should put getPokemonByIdSucceeded with response data', async () => {
//     fetchGetPokemonById.mockImplementation(
//       (): Promise<Pokemon> => Promise.resolve(fakePokemon),
//     );
//     const fakeId = '2';
//
//     await runSaga(
//       fakeStore,
//       getPokemonByIdSaga,
//       getPokemonByIdRequested(fakeId),
//     );
//
//     expect(fetchGetPokemonById.mock.calls.length).toBe(1);
//     expect(dispatchedActions).toContainEqual(
//       getPokemonByIdSucceeded(fakePokemon),
//     );
//   });
//
//   it('Should put getPokemonByIdFailed when api rejects', async () => {
//     fetchGetPokemonById.mockImplementation(
//       (): Promise<Pokemon[]> => Promise.reject(),
//     );
//     const fakeId = '2';
//
//     await runSaga(
//       fakeStore,
//       getPokemonByIdSaga,
//       getPokemonByIdRequested(fakeId),
//     );
//
//     expect(fetchGetPokemonById.mock.calls.length).toBe(1);
//     expect(dispatchedActions).toContainEqual(getPokemonByIdFailed());
//   });
// });
