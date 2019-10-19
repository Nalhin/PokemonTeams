import { cleanup, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import Register from '../Register';
import { createMemoryHistory } from 'history';
import Login from '../../Login/Login';

describe('Register Component', () => {
  afterEach(cleanup);

  it('Should display loading', () => {
    const { getByTestId } = renderWithRouter(
      <Register registerUser={jest.fn()} isLoading />,
    );

    expect(getByTestId('loading_spinner')).toBeTruthy();
  });

  it('Should not allow to register with empty values', () => {
    const mockRegisterUser = jest.fn();
    const { getByTestId } = renderWithRouter(
      <Register registerUser={mockRegisterUser} isLoading={false} />,
    );

    fireEvent.click(getByTestId('register__register-button'));

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

    fireEvent.change(loginInput, {
      target: { value: registerData.login, name: 'login' },
    });
    fireEvent.change(passwordInput, {
      target: { value: registerData.password, name: 'password' },
    });
    fireEvent.change(emailInput, {
      target: { value: registerData.email, name: 'email' },
    });
    fireEvent.click(getByTestId('register__register-button'));

    expect(mockRegisterUser).toHaveBeenCalledWith(registerData);
  });

  it('Should redirect to login', () => {
    const route = '/test';
    const history = createMemoryHistory({ initialEntries: [route] });
    const { getByTestId } = renderWithRouter(
      <Register registerUser={jest.fn()} isLoading={false} />,
      { route, history },
    );

    fireEvent.click(getByTestId('register__login-link'));

    expect(history.location.pathname).toEqual('/');
  });
});
