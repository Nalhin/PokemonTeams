import {
  SnackbarActions,
  SnackbarActionTypes,
  SnackbarState,
} from './snackbar.types';
import { Reducer } from 'react';
import produce from 'immer';

export const INITIAL_STATE: SnackbarState = {
  snackbarData: [],
};

const snackbarReducer: Reducer<SnackbarState, SnackbarActions> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case SnackbarActionTypes.ADD_SNACKBAR:
        draft.snackbarData.push(action.snackbar);
        break;
      case SnackbarActionTypes.REMOVE_SNACKBAR:
        draft.snackbarData = draft.snackbarData.filter(
          snackbar => snackbar.id !== action.id,
        );
        break;
    }
  });
};

export default snackbarReducer;
