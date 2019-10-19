import { cleanup, fireEvent } from '@testing-library/react';
import Login from '../Login';
import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';

describe('Login Component', () => {
  afterEach(cleanup);

  it('Should display loading', () => {
    const { getByTestId } = renderWithRouter(
      <Login loginUser={jest.fn()} isLoading />,
    );

    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('Should not allow to login with empty values', () => {
    const mockLoginUser = jest.fn();
    const { getByTestId } = renderWithRouter(
      <Login loginUser={mockLoginUser} isLoading={false} />,
    );
    const loginButton = getByTestId('login__login-button');

    fireEvent.click(loginButton);

    expect(mockLoginUser).toBeCalledTimes(0);
  });

  it('Should fire loginUser function when values are valid', () => {
    const text = 'test';
    const mockLoginUser = jest.fn();
    const { getByLabelText, getByTestId } = renderWithRouter(
      <Login loginUser={mockLoginUser} isLoading={false} />,
    );
    const loginInput = getByLabelText('Login');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByTestId('login__login-button');

    fireEvent.change(loginInput, { target: { value: text, name: 'login' } });
    fireEvent.change(passwordInput, {
      target: { value: text, name: 'password' },
    });
    fireEvent.click(loginButton);

    expect(mockLoginUser).toHaveBeenCalledWith({
      login: text,
      password: text,
    });
  });

  it('Should redirect to register', () => {
    const { getByTestId, history } = renderWithRouter(
      <Login loginUser={jest.fn()} isLoading={false} />,
    );
    const registerLink = getByTestId('login__register-link');

    fireEvent.click(registerLink);

    expect(history.location.pathname).toEqual('/register');
  });
});
