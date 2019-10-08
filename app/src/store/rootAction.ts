import { PokemonActions } from './pokemon/pokemon.types';
import { TeamActions } from './team/team.types';
import { UserActions } from './user/user.types';

export type RootAction = PokemonActions | TeamActions | UserActions;
