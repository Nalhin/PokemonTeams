import { Snackbar, SnackbarTypes } from '../interfaces/snackbar';
import uniqueId from 'lodash/uniqueId';

export const generateSnackbar = (
  message: string,
  type: SnackbarTypes,
): Snackbar => {
  return { message, type, id: uniqueId() };
};
