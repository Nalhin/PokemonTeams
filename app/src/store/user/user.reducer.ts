import { UserActions, UserActionTypes, UserState } from './user.types';
import { Reducer } from 'react';
import produce from 'immer';

const INITIAL_STATE: UserState = {
  login: '',
  userId: '',
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
        draft.login = action.user.login;
        draft.userId = action.user._id;
        break;
      case UserActionTypes.LOGIN_USER_FAILED:
        draft.isLoading = false;
        break;
      case UserActionTypes.REGISTER_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.REGISTER_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.login = action.user.login;
        draft.userId = action.user._id;
        break;
      case UserActionTypes.REGISTER_USER_FAILED:
        draft.isLoading = false;
        break;
      case UserActionTypes.LOGOUT_USER_REQUESTED:
        draft.isLoading = true;
        break;
      case UserActionTypes.LOGOUT_USER_SUCCEEDED:
        draft.isLoading = false;
        draft.login = '';
        draft.userId = '';
        break;
      case UserActionTypes.LOGOUT_USER_FAILED:
        draft.isLoading = false;
        break;
    }
  });
};

export default userReducer;
