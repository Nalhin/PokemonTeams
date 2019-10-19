import * as React from 'react';
import Navigation from '../Navigation';
import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';

describe('Navigation Component', () => {
  afterEach(cleanup);

  it('Should redirect to "/pokemon"', () => {
    const { getByText, history } = renderWithRouter(
      <Navigation isAuthenticated logoutUser={jest.fn()} />,
    );

    fireEvent.click(getByText(/pokemon/i));

    expect(history.location.pathname).toEqual('/pokemon');
  });

  it('Should redirect to "/teams"', () => {
    const { getByText, history } = renderWithRouter(
      <Navigation isAuthenticated logoutUser={jest.fn()} />,
    );

    fireEvent.click(getByText(/teams/i));

    expect(history.location.pathname).toEqual('/teams');
  });

  it('Should display logout when user is authenticated', () => {
    const { getByText } = renderWithRouter(
      <Navigation isAuthenticated logoutUser={jest.fn()} />,
    );

    expect(getByText(/logout/i)).toBeTruthy();
  });

  it('Should display login when user is not authenticated', () => {
    const { getByText } = renderWithRouter(
      <Navigation isAuthenticated={false} logoutUser={jest.fn()} />,
    );

    expect(getByText(/login/i)).toBeTruthy();
  });

  it('Should allow to logout user', () => {
    const logoutUser = jest.fn();
    const { getByText } = renderWithRouter(
      <Navigation isAuthenticated logoutUser={logoutUser} />,
    );

    fireEvent.click(getByText(/logout/i));

    expect(logoutUser).toHaveBeenCalledTimes(1);
  });
});
