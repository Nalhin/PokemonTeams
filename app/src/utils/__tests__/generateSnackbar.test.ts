import { SnackbarTypes } from '../../interfaces/snackbar';
import { generateSnackbar } from '../generateSnackbar';

describe('generateSnackbar Function', () => {
  it('Should return snackbar values', () => {
    const message = 'message';
    const type = SnackbarTypes.error;
    const expected = { message, type, id: '1' };

    const snackbar = generateSnackbar(message, type);

    expect(snackbar).toEqual(expected);
  });
});
