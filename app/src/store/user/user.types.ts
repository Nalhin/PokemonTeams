import { LoginData } from '../../interfaces/loginData';
import { RegisterData } from '../../interfaces/registerData';
import { UserResponse } from '../../interfaces/userResponse';

export enum UserActionTypes {
  LOGIN_USER_REQUESTED = 'LOGIN_USER_REQUESTED',
  LOGIN_USER_SUCCEEDED = 'LOGIN_USER_SUCCEEDED',
  LOGIN_USER_FAILED = 'LOGIN_USER_FAILED',
  REGISTER_USER_REQUESTED = 'REGISTER_USER_REQUESTED',
  REGISTER_USER_SUCCEEDED = 'REGISTER_USER_SUCCEEDED',
  REGISTER_USER_FAILED = 'REGISTER_USER_FAILED',
  LOGOUT_USER_REQUESTED = 'LOGOUT_USER_REQUESTED',
  LOGOUT_USER_SUCCEEDED = 'LOGOUT_USER_SUCCEEDED',
  LOGOUT_USER_FAILED = 'LOGOUT_USER_FAILED',
}

export interface UserState {
  login: string;
  userId: string;
  isLoading: boolean;
}

export interface LoginUserRequestedAction {
  type: UserActionTypes.LOGIN_USER_REQUESTED;
  loginData: LoginData;
}

export interface LoginUserSucceededAction {
  type: UserActionTypes.LOGIN_USER_SUCCEEDED;
  user: UserResponse;
}

export interface LoginUserFailedAction {
  type: UserActionTypes.LOGIN_USER_FAILED;
}

export interface RegisterUserRequestedAction {
  type: UserActionTypes.REGISTER_USER_REQUESTED;
  registerData: RegisterData;
}

export interface RegisterUserSucceededAction {
  type: UserActionTypes.REGISTER_USER_SUCCEEDED;
  user: UserResponse;
}

export interface RegisterUserFailedAction {
  type: UserActionTypes.REGISTER_USER_FAILED;
}

export interface LogoutUserRequestedAction {
  type: UserActionTypes.LOGOUT_USER_REQUESTED;
}

export interface LogoutUserSucceededAction {
  type: UserActionTypes.LOGOUT_USER_SUCCEEDED;
}

export interface LogoutUserFailedAction {
  type: UserActionTypes.LOGOUT_USER_FAILED;
}

export type UserActions =
  | LoginUserRequestedAction
  | LoginUserSucceededAction
  | LoginUserFailedAction
  | RegisterUserRequestedAction
  | RegisterUserSucceededAction
  | RegisterUserFailedAction
  | LogoutUserRequestedAction
  | LogoutUserSucceededAction
  | LogoutUserFailedAction;
