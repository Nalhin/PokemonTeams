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

export const generateFakeSnackbarAction = (
  message: string,
  type: SnackbarTypes,
) => {
  return {
    snackbar: { id: '1', message, type },
    type: 'ADD_SNACKBAR',
  };
};
