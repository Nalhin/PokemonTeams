import { SnackbarTypes } from '../../src/interfaces/snackbar';

export const fakeSnackbar = {
  message: 'snackbar message',
  type: SnackbarTypes.error,
  id: '1',
};

export const fakeSnackbarErrorAction = {
  snackbar: { id: '1', message: 'Unexpected error', type: 1 },
  type: 'ADD_SNACKBAR',
};

export const fakeSnackbarLoginUserAction = {
  snackbar: { id: '1', message: 'Welcome 1', type: 0 },
  type: 'ADD_SNACKBAR',
};
