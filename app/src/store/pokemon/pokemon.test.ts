import pokemonReducer from './pokemon.reducer';
import { PokemonState } from './pokemon.types';
import { Pokemon } from '../../interfaces/pokemon';
import {
  getAllPokemonFailed,
  getAllPokemonRequested,
  getAllPokemonSucceeded,
  getPokemonByIdFailed,
  getPokemonByIdRequested,
  getPokemonByIdSucceeded,
} from './pokemon.actions';

const mockPokemon = {
  id: '1',
  tags: ['Bug', 'Flying'],
  name: 'Butterfree',
  total: 395,
  hp: 60,
  attack: 45,
  defense: 50,
  spellAttack: 90,
  spellDefense: 80,
  speed: 70,
};

describe('Pokemon reducer', () => {
  it('Should return the initial state', () => {
    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: false },
    };

    const reducer = pokemonReducer(undefined, { type: '' });

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_ALL_POKEMON_REQUESTED', () => {
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

  it('Should handle GET_POKEMON_BY_ID_REQUESTED', () => {
    const reducer = pokemonReducer(undefined, getPokemonByIdRequested('1'));

    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: true },
    };

    expect(reducer).toEqual(expectedState);
  });
  it('Should handle GET_ALL_POKEMON_SUCCEEDED', () => {
    const initialState: PokemonState = {
      pokemonData: { data: [], isLoading: true },
      current: { data: <Pokemon>{}, isLoading: false },
    };
    const data = [mockPokemon, mockPokemon];
    const expectedState: PokemonState = {
      pokemonData: { data, isLoading: false },
      current: { data: <Pokemon>{}, isLoading: false },
    };

    const reducer = pokemonReducer(initialState, getAllPokemonSucceeded(data));

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_POKEMON_BY_ID_SUCCEEDED', () => {
    const initialState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data: <Pokemon>{}, isLoading: true },
    };
    const data = mockPokemon;
    const expectedState: PokemonState = {
      pokemonData: { data: [], isLoading: false },
      current: { data, isLoading: false },
    };

    const reducer = pokemonReducer(initialState, getPokemonByIdSucceeded(data));

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_ALL_POKEMON_FAILED', () => {
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

  it('Should handle GET_POKEMON_BY_ID_FAILED', () => {
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
