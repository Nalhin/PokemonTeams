import { Snackbar } from '../../interfaces/snackbar';
import {
  AddSnackbarAction,
  RemoveSnackbarAction,
  SnackbarActionTypes,
} from './snackbar.types';

export const addSnackbar = (snackbar: Snackbar): AddSnackbarAction => ({
  type: SnackbarActionTypes.ADD_SNACKBAR,
  snackbar,
});

export const removeSnackbar = (id: string): RemoveSnackbarAction => ({
  type: SnackbarActionTypes.REMOVE_SNACKBAR,
  id,
});
