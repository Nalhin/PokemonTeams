import { PokemonActions } from './pokemon/pokemon.types';
import { TeamActions } from './team/team.types';
import { UserActions } from './user/user.types';
import { ModalActions } from './modal/modal.types';
import { SnackbarActions } from './snackbar/snackbar.types';

export type RootAction =
  | PokemonActions
  | TeamActions
  | UserActions
  | ModalActions
  | SnackbarActions;
