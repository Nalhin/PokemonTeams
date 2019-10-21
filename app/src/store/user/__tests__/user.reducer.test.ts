import userReducer, { INITIAL_STATE } from '../user.reducer';
import {
  authorizeUserFailed,
  authorizeUserRequested,
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
import { UserState } from '../user.types';
import { fakeLoginData } from '../../../../test/fixtures/loginData';
import { fakeUser } from '../../../../test/fixtures/user';
import { fakeRegisterData } from '../../../../test/fixtures/registerData';

describe('User Reducer', () => {
  it('Should return the initial state', () => {
    const expectedState = { ...INITIAL_STATE };

    const reducer = userReducer(undefined, authorizeUserFailed());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle LOGIN_USER_REQUESTED action', () => {
    const expectedState: UserState = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    const action = loginUserRequested(fakeLoginData);

    const reducer = userReducer(INITIAL_STATE, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle LOGIN_USER_SUCCEEDED action', () => {
    const initialState: UserState = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    const expectedState: UserState = {
      ...INITIAL_STATE,
      userData: { ...fakeUser },
      isAuthenticated: true,
    };
    const action = loginUserSucceeded(fakeUser);

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle LOGIN_USER_FAILED action', () => {
    const initialState: UserState = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    const expectedState = INITIAL_STATE;
    const action = loginUserFailed();

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle REGISTER_USER_REQUESTED action', () => {
    const initialState: UserState = { ...INITIAL_STATE };
    const expectedState: UserState = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    const action = registerUserRequested(fakeRegisterData);

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle REGISTER_USER_SUCCEEDED action', () => {
    const initialState: UserState = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    const expectedState: UserState = {
      ...INITIAL_STATE,
      userData: { ...fakeUser },
      isAuthenticated: true,
    };
    const action = registerUserSucceeded(fakeUser);

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle REGISTER_USER_FAILED action', () => {
    const initialState: UserState = {
      ...INITIAL_STATE,
      isLoading: true,
    };
    const expectedState = INITIAL_STATE;
    const action = registerUserFailed();

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle LOGOUT_USER_REQUESTED action', () => {
    const initialState: UserState = { ...INITIAL_STATE };
    const expectedState: UserState = { ...INITIAL_STATE, isLoading: true };
    const action = logoutUserRequested();

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle LOGOUT_USER_SUCCEEDED action', () => {
    const initialState: UserState = { ...INITIAL_STATE, isLoading: true };
    const expectedState: UserState = INITIAL_STATE;
    const action = logoutUserSucceeded();

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle LOGOUT_USER_FAILED action', () => {
    const initialState: UserState = {
      ...INITIAL_STATE,
      userData: { ...fakeUser },
      isAuthenticated: true,
      isLoading: true,
    };
    const expectedState: UserState = {
      ...INITIAL_STATE,
      userData: { ...fakeUser },
      isAuthenticated: true,
      isLoading: false,
    };
    const action = logoutUserFailed();

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle AUTHORIZE_USER_REQUESTED action', () => {
    const initialState = { ...INITIAL_STATE };
    const expectedState: UserState = { ...INITIAL_STATE, isLoading: true };
    const action = authorizeUserRequested();

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle AUTHORIZE_USER_SUCCEEDED action', () => {
    const initialState: UserState = { ...INITIAL_STATE, isLoading: true };
    const expectedState: UserState = {
      ...INITIAL_STATE,
      userData: { ...fakeUser },
      isAuthenticated: true,
    };
    const action = authorizeUserSucceeded(fakeUser);

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle AUTHORIZE_USER_FAILED action', () => {
    const initialState: UserState = { ...INITIAL_STATE, isLoading: true };
    const expectedState: UserState = { ...INITIAL_STATE };
    const action = authorizeUserFailed();

    const reducer = userReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
