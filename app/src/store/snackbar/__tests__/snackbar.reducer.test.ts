import { SnackbarState } from '../snackbar.types';
import { fakeSnackbar } from '../../../../test/fixtures/snackbar';
import { addSnackbar, removeSnackbar } from '../sanckbar.action';
import snackbarReducer, { INITIAL_STATE } from '../snackbar.reducer';

describe('Snackbar Reducer', () => {
  it('Should return the initial state', () => {
    const action = removeSnackbar('0');

    const reducer = snackbarReducer(undefined, action);

    expect(reducer).toEqual(INITIAL_STATE);
  });

  it('Should handle ADD_SNACKBAR action', () => {
    const initialState: SnackbarState = {
      snackbarData: [],
    };
    const expectedState: SnackbarState = {
      snackbarData: [fakeSnackbar],
    };
    const action = addSnackbar(fakeSnackbar);

    const reducer = snackbarReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle REMOVE_SNACKBAR', () => {
    const initialState: SnackbarState = {
      snackbarData: [fakeSnackbar],
    };
    const expectedState: SnackbarState = {
      snackbarData: [],
    };
    const action = removeSnackbar(fakeSnackbar.id);

    const reducer = snackbarReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
