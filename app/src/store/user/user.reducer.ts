import { UserActions, UserActionTypes, UserState } from './user.types';
import { Reducer } from 'react';
import produce from 'immer';

const INITIAL_STATE: UserState = {
  userData: { login: '', _id: '' },
  isAuthorized: false,
  isLoading: false,
};

const userReducer: Reducer<UserState, UserActions> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case UserActionTypes.LOGIN_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.LOGIN_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.userData = action.user;
        draft.isAuthorized = true;
        break;
      case UserActionTypes.LOGIN_USER_FAILED:
        draft.isLoading = false;
        break;
      case UserActionTypes.REGISTER_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.REGISTER_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.userData = action.user;
        draft.isAuthorized = true;
        break;
      case UserActionTypes.REGISTER_USER_FAILED:
        draft.isLoading = false;
        break;
      case UserActionTypes.LOGOUT_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.LOGOUT_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.userData = INITIAL_STATE.userData;
        break;
      case UserActionTypes.LOGOUT_USER_FAILED:
        draft.isLoading = false;
        break;
      case UserActionTypes.AUTHORIZE_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.AUTHORIZE_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.userData = action.user;
        draft.isAuthorized = true;
        break;
      case UserActionTypes.AUTHORIZE_USER_FAILED:
        draft.isLoading = false;
        break;
    }
  });
};

export default userReducer;
