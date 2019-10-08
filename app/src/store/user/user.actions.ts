import { LoginData } from '../../interfaces/loginData';
import { RegisterData } from '../../interfaces/registerData';
import {
  LoginUserFailedAction,
  LoginUserRequestedAction,
  LoginUserSucceededAction,
  LogoutUserFailedAction,
  LogoutUserRequestedAction,
  LogoutUserSucceededAction,
  RegisterUserFailedAction,
  RegisterUserRequestedAction,
  RegisterUserSucceededAction,
  UserActionTypes,
} from './user.types';
import { UserResponse } from '../../interfaces/userResponse';

export const loginUserRequested = (
  loginData: LoginData,
): LoginUserRequestedAction => ({
  type: UserActionTypes.LOGIN_USER_REQUESTED,
  loginData,
});

export const loginUserSucceeded = (
  user: UserResponse,
): LoginUserSucceededAction => ({
  type: UserActionTypes.LOGIN_USER_SUCCEEDED,
  user,
});

export const loginUserFailed = (): LoginUserFailedAction => ({
  type: UserActionTypes.LOGIN_USER_FAILED,
});

export const registerUserRequested = (
  registerData: RegisterData,
): RegisterUserRequestedAction => ({
  type: UserActionTypes.REGISTER_USER_REQUESTED,
  registerData,
});

export const registerUserSucceeded = (
  user: UserResponse,
): RegisterUserSucceededAction => ({
  type: UserActionTypes.REGISTER_USER_SUCCEEDED,
  user,
});

export const registerUserFailed = (): RegisterUserFailedAction => ({
  type: UserActionTypes.REGISTER_USER_FAILED,
});

export const logoutUserRequested = (): LogoutUserRequestedAction => ({
  type: UserActionTypes.LOGOUT_USER_REQUESTED,
});

export const logoutUserSucceeded = (): LogoutUserSucceededAction => ({
  type: UserActionTypes.LOGOUT_USER_SUCCEEDED,
});

export const logoutUserFailed = (): LogoutUserFailedAction => ({
  type: UserActionTypes.LOGOUT_USER_FAILED,
});
