import { runSaga } from 'redux-saga';
import { loginUserSaga, registerUserSaga } from '../user.saga';
import {
  loginUserFailed,
  loginUserRequested,
  loginUserSucceeded,
  registerUserFailed,
  registerUserRequested,
  registerUserSucceeded,
} from '../user.actions';
import { fakeLoginData } from '../../../../test/fixtures/loginData';
import { fakeUser } from '../../../../test/fixtures/user';
import { PokemonActions } from '../../pokemon/pokemon.types';
import {
  fakeSnackbarErrorAction,
  fakeSnackbarLoginUserAction,
} from '../../../../test/fixtures/snackbar';
import * as userApi from '../../user/user.api';
import {
  fakeAxiosError,
  fakeAxiosSuccessResponse,
} from '../../../../test/fixtures/axios';
import { fakeRegisterData } from '../../../../test/fixtures/registerData';

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
      fakeSnackbarLoginUserAction,
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
      fakeSnackbarLoginUserAction,
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

  it('Should logoutUser successfully', () => {});
  it('Should handle logoutUser errors', () => {});
  it('Should authorizeUser successfully', () => {});
  it('Should handle authorizeUser errors', () => {});
});
