import { Snackbar } from '../../interfaces/snackbar';

export interface SnackbarState {
  readonly snackbarData: Snackbar[];
}

export enum SnackbarActionTypes {
  ADD_SNACKBAR = 'ADD_SNACKBAR',
  REMOVE_SNACKBAR = 'REMOVE_SNACKBAR',
}

export interface AddSnackbarAction {
  type: typeof SnackbarActionTypes.ADD_SNACKBAR;
  snackbar: Snackbar;
}

export interface RemoveSnackbarAction {
  type: typeof SnackbarActionTypes.REMOVE_SNACKBAR;
  id: string;
}

export type SnackbarActions = AddSnackbarAction | RemoveSnackbarAction;
