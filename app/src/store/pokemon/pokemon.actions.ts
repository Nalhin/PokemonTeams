import {
  GetAllPokemonFailedAction,
  GetAllPokemonRequestedAction,
  GetAllPokemonSucceededAction,
  GetPokemonByIdFailedAction,
  GetPokemonByIdRequestedAction,
  GetPokemonByIdSucceededAction,
  PokemonActionTypes,
} from './pokemon.types';
import { Pokemon } from '../../interfaces/pokemon';

export const getAllPokemonRequested = (): GetAllPokemonRequestedAction => ({
  type: PokemonActionTypes.GET_ALL_POKEMON_REQUESTED,
});

export const getAllPokemonSucceeded = (
  data: Pokemon[],
): GetAllPokemonSucceededAction => ({
  type: PokemonActionTypes.GET_ALL_POKEMON_SUCCEEDED,
  data,
});

export const getAllPokemonFailed = (): GetAllPokemonFailedAction => ({
  type: PokemonActionTypes.GET_ALL_POKEMON_FAILED,
});

export const getPokemonByIdRequested = (
  id: string,
): GetPokemonByIdRequestedAction => ({
  type: PokemonActionTypes.GET_POKEMON_BY_ID_REQUESTED,
  id,
});

export const getPokemonByIdSucceeded = (
  data: Pokemon,
): GetPokemonByIdSucceededAction => ({
  type: PokemonActionTypes.GET_POKEMON_BY_ID_SUCCEEDED,
  data,
});

export const getPokemonByIdFailed = (): GetPokemonByIdFailedAction => ({
  type: PokemonActionTypes.GET_POKEMON_BY_ID_FAILED,
});
