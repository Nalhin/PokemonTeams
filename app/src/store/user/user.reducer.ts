import { UserActions, UserActionTypes, UserState } from './user.types';
import { Reducer } from 'react';
import produce from 'immer';

export const INITIAL_STATE: UserState = {
  userData: { login: '', _id: '' },
  isAuthenticated: false,
  isLoading: false,
};

const userReducer: Reducer<UserState, UserActions> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case UserActionTypes.LOGIN_USER_REQUESTED:
      case UserActionTypes.REGISTER_USER_REQUESTED:
      case UserActionTypes.LOGOUT_USER_REQUESTED:
      case UserActionTypes.AUTHORIZE_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.LOGIN_USER_SUCCEEDED:
      case UserActionTypes.REGISTER_USER_SUCCEEDED:
      case UserActionTypes.AUTHORIZE_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.userData = action.user;
        draft.isAuthenticated = true;
        break;
      case UserActionTypes.LOGIN_USER_FAILED:
      case UserActionTypes.REGISTER_USER_FAILED:
      case UserActionTypes.LOGOUT_USER_FAILED:
      case UserActionTypes.AUTHORIZE_USER_FAILED:
        draft.isLoading = false;
        break;
      case UserActionTypes.LOGOUT_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.isAuthenticated = false;
        draft.userData = INITIAL_STATE.userData;
        break;
      default:
        break;
    }
  });
};

export default userReducer;
