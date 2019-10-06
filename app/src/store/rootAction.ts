import { PokemonActions } from './pokemon/pokemon.types';
import { TeamActions } from './team/team.types';

export type RootAction = PokemonActions | TeamActions;
