import { SagaIterator } from 'redux-saga';
import { call, put, all, takeEvery } from '@redux-saga/core/effects';
import {
  LoginUserRequestedAction,
  LogoutUserRequestedAction,
  RegisterUserRequestedAction,
  UserActionTypes,
} from './user.types';
import { fetchLoginUser, fetchLogoutUser, fetchRegisterUser } from './user.api';
import {
  loginUserFailed,
  loginUserSucceeded,
  logoutUserFailed,
  logoutUserSucceeded,
  registerUserFailed,
  registerUserSucceeded,
} from './user.actions';

export function* userRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(UserActionTypes.LOGIN_USER_REQUESTED, loginUserSaga),
    yield takeEvery(UserActionTypes.REGISTER_USER_REQUESTED, registerUserSaga),
    yield takeEvery(UserActionTypes.LOGOUT_USER_REQUESTED, logoutUserSaga),
  ]);
}

export function* loginUserSaga(action: LoginUserRequestedAction): SagaIterator {
  try {
    const loginData = yield call(fetchLoginUser, action.loginData);
    yield put(loginUserSucceeded(loginData));
  } catch (e) {
    yield put(loginUserFailed());
  }
}

export function* registerUserSaga(
  action: RegisterUserRequestedAction,
): SagaIterator {
  try {
    const registerData = yield call(fetchRegisterUser, action.registerData);
    yield put(registerUserSucceeded(registerData));
  } catch (e) {
    yield put(registerUserFailed());
  }
}

export function* logoutUserSaga(
  action: LogoutUserRequestedAction,
): SagaIterator {
  try {
    const response = yield call(fetchLogoutUser);
    yield put(logoutUserSucceeded());
  } catch (e) {
    yield put(logoutUserFailed());
  }
}
