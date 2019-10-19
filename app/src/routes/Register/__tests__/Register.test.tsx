import { cleanup, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import Register from '../Register';
import Login from '../../Login/Login';

describe('Register Component', () => {
  afterEach(cleanup);

  it('Should display loading', () => {
    const { getByTestId } = renderWithRouter(
      <Register registerUser={jest.fn()} isLoading />,
    );

    expect(getByTestId('loading-spinner')).toBeTruthy();
  });

  it('Should not allow to register with empty values', () => {
    const mockRegisterUser = jest.fn();
    const { getByTestId } = renderWithRouter(
      <Register registerUser={mockRegisterUser} isLoading={false} />,
    );
    const registerButton = getByTestId('register__register-button');

    fireEvent.click(registerButton);

    expect(mockRegisterUser).toBeCalledTimes(0);
  });

  it('Should fire registerUser function when values are valid', () => {
    const registerData = {
      login: 'login',
      password: 'password',
      email: 'email',
    };
    const mockRegisterUser = jest.fn();
    const { getByLabelText, getByTestId } = renderWithRouter(
      <Register registerUser={mockRegisterUser} isLoading={false} />,
    );
    const loginInput = getByLabelText('Login');
    const passwordInput = getByLabelText('Password');
    const emailInput = getByLabelText('Email');
    const registerButton = getByTestId('register__register-button');

    fireEvent.change(loginInput, {
      target: { value: registerData.login, name: 'login' },
    });
    fireEvent.change(passwordInput, {
      target: { value: registerData.password, name: 'password' },
    });
    fireEvent.change(emailInput, {
      target: { value: registerData.email, name: 'email' },
    });
    fireEvent.click(registerButton);

    expect(mockRegisterUser).toHaveBeenCalledWith(registerData);
  });

  it('Should redirect to login', () => {
    const route = '/test';
    const { getByTestId, history } = renderWithRouter(
      <Register registerUser={jest.fn()} isLoading={false} />,
      { route },
    );
    const loginLink = getByTestId('register__login-link');

    fireEvent.click(loginLink);

    expect(history.location.pathname).toEqual('/');
  });
});
