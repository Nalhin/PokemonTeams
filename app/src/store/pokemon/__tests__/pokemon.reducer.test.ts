import pokemonReducer, { INITIAL_STATE } from '../pokemon.reducer';
import { PokemonState } from '../pokemon.types';
import {
  getAllPokemonFailed,
  getAllPokemonRequested,
  getAllPokemonSucceeded,
  getPokemonByIdFailed,
  getPokemonByIdRequested,
  getPokemonByIdSucceeded,
  loadMorePokemon,
} from '../pokemon.actions';
import { fakePokemon } from '../../../../test/fixtures/pokemon';

describe('Pokemon reducer', () => {
  it('Should return the initial state', () => {
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
      pokemonData: { ...INITIAL_STATE.pokemonData, isLoading: true },
    };

    const reducer = pokemonReducer(undefined, getAllPokemonRequested());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_ALL_POKEMON_REQUESTED action', () => {
    const initialState: PokemonState = { ...INITIAL_STATE };
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
      pokemonData: { ...INITIAL_STATE.pokemonData, isLoading: true },
    };

    const reducer = pokemonReducer(initialState, getAllPokemonRequested());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_ALL_POKEMON_SUCCEEDED action', () => {
    const initialState: PokemonState = {
      ...INITIAL_STATE,
      pokemonData: { ...INITIAL_STATE.pokemonData, isLoading: true },
    };
    const data = [fakePokemon, fakePokemon];
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
      pokemonData: { ...INITIAL_STATE.pokemonData, data },
    };

    const reducer = pokemonReducer(initialState, getAllPokemonSucceeded(data));

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_ALL_POKEMON_FAILED action', () => {
    const initialState: PokemonState = {
      ...INITIAL_STATE,
      pokemonData: { ...INITIAL_STATE.pokemonData, isLoading: true },
    };
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
    };

    const reducer = pokemonReducer(initialState, getAllPokemonFailed());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_POKEMON_BY_ID_REQUESTED action', () => {
    const initialState: PokemonState = { ...INITIAL_STATE };
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };

    const reducer = pokemonReducer(initialState, getPokemonByIdRequested('1'));

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_POKEMON_BY_ID_SUCCEEDED action', () => {
    const initialState: PokemonState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const data = fakePokemon;
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, data },
    };

    const reducer = pokemonReducer(initialState, getPokemonByIdSucceeded(data));

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_POKEMON_BY_ID_FAILED action', () => {
    const initialState: PokemonState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
    };

    const reducer = pokemonReducer(initialState, getPokemonByIdFailed());

    expect(reducer).toEqual(expectedState);
  });
  it('Should handle LOAD_MORE_POKEMON action', () => {
    const amountToLoad = 20;
    const initialState: PokemonState = {
      ...INITIAL_STATE,
    };
    const expectedState: PokemonState = {
      ...INITIAL_STATE,
      pokemonData: {
        ...INITIAL_STATE.pokemonData,
        loaded: INITIAL_STATE.pokemonData.loaded + amountToLoad,
      },
    };
    const action = loadMorePokemon(amountToLoad);

    const reducer = pokemonReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
