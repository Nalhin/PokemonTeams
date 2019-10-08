import { Pokemon } from '../../interfaces/pokemon';

export interface PokemonState {
  readonly pokemonData: { data: Pokemon[]; isLoading: boolean };
  readonly current: { data: Pokemon; isLoading: boolean };
}

export enum PokemonActionTypes {
  GET_ALL_POKEMON_REQUESTED = 'GET_ALL_POKEMON_REQUESTED',
  GET_ALL_POKEMON_SUCCEEDED = 'GET_ALL_POKEMON_SUCCEEDED',
  GET_ALL_POKEMON_FAILED = 'GET_ALL_POKEMON_FAILED',
  GET_POKEMON_BY_ID_REQUESTED = 'GET_POKEMON_BY_ID_REQUESTED',
  GET_POKEMON_BY_ID_SUCCEEDED = 'GET_POKEMON_BY_ID_SUCCEEDED',
  GET_POKEMON_BY_ID_FAILED = 'GET_POKEMON_BY_ID_FAILED',
}

export interface GetAllPokemonRequestedAction {
  type: typeof PokemonActionTypes.GET_ALL_POKEMON_REQUESTED;
}

export interface GetAllPokemonSucceededAction {
  type: typeof PokemonActionTypes.GET_ALL_POKEMON_SUCCEEDED;
  data: Pokemon[];
}

export interface GetAllPokemonFailedAction {
  type: typeof PokemonActionTypes.GET_ALL_POKEMON_FAILED;
}

export interface GetPokemonByIdRequestedAction {
  type: typeof PokemonActionTypes.GET_POKEMON_BY_ID_REQUESTED;
  id: string;
}

export interface GetPokemonByIdSucceededAction {
  type: typeof PokemonActionTypes.GET_POKEMON_BY_ID_SUCCEEDED;
  data: Pokemon;
}

export interface GetPokemonByIdFailedAction {
  type: typeof PokemonActionTypes.GET_POKEMON_BY_ID_FAILED;
}

export type PokemonActions =
  | GetAllPokemonRequestedAction
  | GetAllPokemonSucceededAction
  | GetAllPokemonFailedAction
  | GetPokemonByIdRequestedAction
  | GetPokemonByIdSucceededAction
  | GetPokemonByIdFailedAction;
