import produce from 'immer';

import {
  PokemonActions,
  PokemonActionTypes,
  PokemonState,
} from './pokemon.types';
import { Reducer } from 'redux';
import { Pokemon } from '../../interfaces/pokemon';

export const INITIAL_STATE: PokemonState = {
  pokemonData: { data: [], isLoading: false, loaded: 50 },
  current: { data: <Pokemon>{}, isLoading: false },
};

const pokemonReducer: Reducer<PokemonState, PokemonActions> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case PokemonActionTypes.GET_ALL_POKEMON_REQUESTED:
        draft.pokemonData.isLoading = true;
        break;
      case PokemonActionTypes.GET_POKEMON_BY_ID_REQUESTED:
        draft.current.data = {} as Pokemon;
        draft.current.isLoading = true;
        break;
      case PokemonActionTypes.GET_ALL_POKEMON_SUCCEEDED:
        draft.pokemonData.data = action.data;
        draft.pokemonData.isLoading = false;
        break;
      case PokemonActionTypes.GET_POKEMON_BY_ID_SUCCEEDED:
        draft.current.data = action.data;
        draft.current.isLoading = false;
        break;
      case PokemonActionTypes.GET_ALL_POKEMON_FAILED:
        draft.pokemonData.isLoading = false;
        break;
      case PokemonActionTypes.GET_POKEMON_BY_ID_FAILED:
        draft.current.isLoading = false;
        break;
      case PokemonActionTypes.LOAD_MORE_POKEMON:
        draft.pokemonData.loaded += action.amountToLoad;
        break;
      default:
        break;
    }
  });
};

export default pokemonReducer;
