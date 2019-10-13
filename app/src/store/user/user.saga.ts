import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from '@redux-saga/core/effects';
import {
  LoginUserRequestedAction,
  LogoutUserRequestedAction,
  RegisterUserRequestedAction,
  UserActionTypes,
} from './user.types';
import {
  fetchAuthorizeUser,
  fetchLoginUser,
  fetchLogoutUser,
  fetchRegisterUser,
} from './user.api';
import {
  authorizeUserFailed,
  authorizeUserSucceeded,
  loginUserFailed,
  loginUserSucceeded,
  logoutUserFailed,
  logoutUserSucceeded,
  registerUserFailed,
  registerUserSucceeded,
} from './user.actions';
import { addSnackbar } from '../snackbar/sanckbar.action';
import { generateSnackbar } from '../../utils/generateSnackbar';
import { SnackbarTypes } from '../../interfaces/snackbar';

export function* userRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(UserActionTypes.LOGIN_USER_REQUESTED, loginUserSaga),
    yield takeEvery(UserActionTypes.REGISTER_USER_REQUESTED, registerUserSaga),
    yield takeEvery(UserActionTypes.LOGOUT_USER_REQUESTED, logoutUserSaga),
    yield takeEvery(
      UserActionTypes.AUTHORIZE_USER_REQUESTED,
      authorizeUserSaga,
    ),
  ]);
}

export function* loginUserSaga(action: LoginUserRequestedAction): SagaIterator {
  try {
    const loginData = yield call(fetchLoginUser, action.loginData);
    yield put(loginUserSucceeded(loginData));
    yield put(addSnackbar(generateSnackbar('added', SnackbarTypes.success)));
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

export function* authorizeUserSaga(): SagaIterator {
  try {
    const user = yield call(fetchAuthorizeUser);
    yield put(authorizeUserSucceeded(user));
  } catch (e) {
    yield put(authorizeUserFailed());
  }
}
