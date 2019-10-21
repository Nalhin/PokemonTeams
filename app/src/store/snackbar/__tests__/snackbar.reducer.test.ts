import { SnackbarState } from '../snackbar.types';
import { fakeSnackbar } from '../../../../test/fixtures/snackbar';
import { addSnackbar, removeSnackbar } from '../sanckbar.action';
import snackbarReducer, { INITIAL_STATE } from '../snackbar.reducer';

describe('Snackbar Reducer', () => {
  it('Should return the initial state', () => {
    const initialState: SnackbarState = { ...INITIAL_STATE };
    const action = removeSnackbar('0');

    const reducer = snackbarReducer(undefined, action);

    expect(reducer).toEqual(initialState);
  });

  it('Should handle ADD_SNACKBAR action', () => {
    const initialState: SnackbarState = {
      ...INITIAL_STATE,
    };
    const expectedState: SnackbarState = {
      ...INITIAL_STATE,
      snackbarData: [fakeSnackbar],
    };
    const action = addSnackbar(fakeSnackbar);

    const reducer = snackbarReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle REMOVE_SNACKBAR', () => {
    const initialState: SnackbarState = {
      ...INITIAL_STATE,
      snackbarData: [fakeSnackbar],
    };
    const expectedState: SnackbarState = {
      ...INITIAL_STATE,
    };
    const action = removeSnackbar(fakeSnackbar.id);

    const reducer = snackbarReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
