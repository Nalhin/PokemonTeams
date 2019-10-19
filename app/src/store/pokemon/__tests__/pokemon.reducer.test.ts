import pokemonReducer from '../pokemon.reducer';
import { PokemonState } from '../pokemon.types';
import { Pokemon } from '../../../interfaces/pokemon';
import {
  getAllPokemonFailed,
  getAllPokemonRequested,
  getAllPokemonSucceeded,
  getPokemonByIdFailed,
  getPokemonByIdRequested,
  getPokemonByIdSucceeded,
} from '../pokemon.actions';
import { fakePokemon } from '../../../../test/fixtures/pokemon';

describe('Pokemon reducer', () => {
  it('Should return the initial state', () => {
    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: true },
      current: { data: <Pokemon>{}, isLoading: false },
    };

    const reducer = pokemonReducer(undefined, getAllPokemonRequested());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_ALL_POKEMON_REQUESTED action', () => {
    const initialState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: false },
    };
    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: true },
      current: { data: <Pokemon>{}, isLoading: false },
    };

    const reducer = pokemonReducer(initialState, getAllPokemonRequested());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_POKEMON_BY_ID_REQUESTED action', () => {
    const reducer = pokemonReducer(undefined, getPokemonByIdRequested('1'));

    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: true },
    };

    expect(reducer).toEqual(expectedState);
  });
  it('Should handle GET_ALL_POKEMON_SUCCEEDED action', () => {
    const initialState: PokemonState = {
      pokemonData: { data: [], isLoading: true },
      current: { data: <Pokemon>{}, isLoading: false },
    };
    const data = [fakePokemon, fakePokemon];
    const expectedState: PokemonState = {
      pokemonData: { data, isLoading: false },
      current: { data: <Pokemon>{}, isLoading: false },
    };

    const reducer = pokemonReducer(initialState, getAllPokemonSucceeded(data));

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_POKEMON_BY_ID_SUCCEEDED action', () => {
    const initialState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: true },
    };
    const data = fakePokemon;
    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data, isLoading: false },
    };

    const reducer = pokemonReducer(initialState, getPokemonByIdSucceeded(data));

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_ALL_POKEMON_FAILED action', () => {
    const initialState: PokemonState = {
      pokemonData: { data: [], isLoading: true },
      current: { data: <Pokemon>{}, isLoading: false },
    };
    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: false },
    };

    const reducer = pokemonReducer(initialState, getAllPokemonFailed());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_POKEMON_BY_ID_FAILED action', () => {
    const initialState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: true },
    };
    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: false },
    };

    const reducer = pokemonReducer(initialState, getPokemonByIdFailed());

    expect(reducer).toEqual(expectedState);
  });
});
