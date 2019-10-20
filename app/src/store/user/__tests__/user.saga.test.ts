import { runSaga } from 'redux-saga';
import {
  authorizeUserSaga,
  loginUserSaga,
  logoutUserSaga,
  registerUserSaga,
} from '../user.saga';
import {
  authorizeUserFailed,
  authorizeUserSucceeded,
  loginUserFailed,
  loginUserRequested,
  loginUserSucceeded,
  logoutUserFailed,
  logoutUserRequested,
  logoutUserSucceeded,
  registerUserFailed,
  registerUserRequested,
  registerUserSucceeded,
} from '../user.actions';
import { fakeLoginData } from '../../../../test/fixtures/loginData';
import { fakeUser } from '../../../../test/fixtures/user';
import { PokemonActions } from '../../pokemon/pokemon.types';
import {
  fakeSnackbarErrorAction,
  generateFakeSnackbarAction,
} from '../../../../test/fixtures/snackbar';
import * as userApi from '../../user/user.api';
import {
  fakeAxiosError,
  fakeAxiosSuccessResponse,
} from '../../../../test/fixtures/axios';
import { fakeRegisterData } from '../../../../test/fixtures/registerData';
import { SnackbarTypes } from '../../../interfaces/snackbar';

const dispatchedActions: PokemonActions[] = [];
const fakeStore = {
  dispatch: (action: PokemonActions) => dispatchedActions.push(action),
};
const mockId = fakeSnackbarErrorAction.snackbar.id;
jest.mock('lodash/uniqueId', () => () => mockId);

describe('User Saga', () => {
  beforeEach(() => {
    dispatchedActions.length = 0;
    jest.clearAllMocks();
  });

  it('Should loginUser successfully', async () => {
    const apiMock = jest.spyOn(userApi, 'fetchLoginUser').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
      data: fakeUser,
    });
    const expectedDispatchedActions = [
      loginUserSucceeded(fakeUser),
      generateFakeSnackbarAction(
        `Welcome ${fakeUser.login}`,
        SnackbarTypes.success,
      ),
    ];

    await runSaga(fakeStore, loginUserSaga, loginUserRequested(fakeLoginData));

    expect(apiMock).toHaveBeenCalledWith(fakeLoginData);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle loginUser errors', async () => {
    const apiMock = jest.spyOn(userApi, 'fetchLoginUser').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      loginUserFailed(),
    ];

    await runSaga(fakeStore, loginUserSaga, loginUserRequested(fakeLoginData));

    expect(apiMock).toHaveBeenCalledWith(fakeLoginData);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should registerUser successfully', async () => {
    const apiMock = jest.spyOn(userApi, 'fetchRegisterUser').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
      data: fakeUser,
    });
    const expectedDispatchedActions = [
      registerUserSucceeded(fakeUser),
      generateFakeSnackbarAction(
        `Welcome ${fakeUser.login}`,
        SnackbarTypes.success,
      ),
    ];

    await runSaga(
      fakeStore,
      registerUserSaga,
      registerUserRequested(fakeRegisterData),
    );

    expect(apiMock).toHaveBeenCalledWith(fakeRegisterData);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle registerUser errors', async () => {
    const apiMock = jest.spyOn(userApi, 'fetchRegisterUser').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      registerUserFailed(),
    ];

    await runSaga(
      fakeStore,
      registerUserSaga,
      registerUserRequested(fakeRegisterData),
    );

    expect(apiMock).toHaveBeenCalledWith(fakeRegisterData);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should logoutUser successfully', async () => {
    const apiMock = jest.spyOn(userApi, 'fetchLogoutUser').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
    });
    const expectedDispatchedActions = [
      generateFakeSnackbarAction('Logout successful', SnackbarTypes.success),
      logoutUserSucceeded(),
    ];

    await runSaga(fakeStore, logoutUserSaga, logoutUserRequested());

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle logoutUser errors', async () => {
    const apiMock = jest.spyOn(userApi, 'fetchLogoutUser').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      logoutUserFailed(),
    ];

    await runSaga(fakeStore, logoutUserSaga, logoutUserRequested());

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should authorizeUser successfully', async () => {
    const apiMock = jest
      .spyOn(userApi, 'fetchAuthorizeUser')
      .mockResolvedValue({
        ...fakeAxiosSuccessResponse,
        data: fakeUser,
      });
    const expectedDispatchedActions = [
      authorizeUserSucceeded(fakeUser),
      generateFakeSnackbarAction(
        `Welcome back ${fakeUser.login}`,
        SnackbarTypes.info,
      ),
    ];

    await runSaga(fakeStore, authorizeUserSaga);

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle authorizeUser errors', async () => {
    const apiMock = jest
      .spyOn(userApi, 'fetchAuthorizeUser')
      .mockRejectedValue({
        ...fakeAxiosError,
      });
    const expectedDispatchedActions = [authorizeUserFailed()];

    await runSaga(fakeStore, authorizeUserSaga);

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });
});
