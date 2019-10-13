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
import { generateErrorMessage } from '../../utils/generateErrorMessage';

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
    const response = yield call(fetchLoginUser, action.loginData);
    yield put(loginUserSucceeded(response.data));
    yield put(
      addSnackbar(
        generateSnackbar(
          `Welcome ${response.data.login}`,
          SnackbarTypes.success,
        ),
      ),
    );
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(loginUserFailed());
  }
}

export function* registerUserSaga(
  action: RegisterUserRequestedAction,
): SagaIterator {
  try {
    const response = yield call(fetchRegisterUser, action.registerData);
    yield put(registerUserSucceeded(response.data));
    yield put(
      addSnackbar(
        generateSnackbar(
          `Welcome ${response.data.login}`,
          SnackbarTypes.success,
        ),
      ),
    );
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(registerUserFailed());
  }
}

export function* logoutUserSaga(
  action: LogoutUserRequestedAction,
): SagaIterator {
  try {
    yield call(fetchLogoutUser);
    yield put(
      addSnackbar(generateSnackbar(`Logout successful`, SnackbarTypes.success)),
    );
    yield put(logoutUserSucceeded());
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(logoutUserFailed());
  }
}

export function* authorizeUserSaga(): SagaIterator {
  try {
    const response = yield call(fetchAuthorizeUser);
    yield put(authorizeUserSucceeded(response.data));
    yield put(
      addSnackbar(
        generateSnackbar(
          `Welcome back ${response.data.login}`,
          SnackbarTypes.info,
        ),
      ),
    );
  } catch (e) {
    yield put(authorizeUserFailed());
  }
}
