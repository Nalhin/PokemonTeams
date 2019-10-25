import * as React from 'react';
import { cleanup } from '@testing-library/react';
import View from '../View';
import { renderWithStore } from '../../../test/utils/renderWithStore';
import { AppState } from '../../store/rootReducer';
import { fakeUser } from '../../../test/fixtures/user';

jest.mock('../../components/PokemonModelViewer/PokemonModelViewer', () => {
  return () => <div />;
});

describe('View Component', () => {
  afterEach(cleanup);

  it('Should handle "/" route', async () => {
    const route = '/';
    const { findByTestId } = renderWithStore(<View />, {
      route,
    });

    const login = await findByTestId('login');

    expect(login).toBeTruthy();
  });

  it('Should redirect from "/" if user is logged in', () => {
    const route = '/';
    const initialState: Partial<AppState> = {
      user: {
        userData: { ...fakeUser },
        isLoading: false,
        isAuthenticated: true,
      },
    };
    const { history } = renderWithStore(<View />, {
      route,
      initialState,
    });

    expect(history.location.pathname).not.toBe(route);
  });

  it('Should handle "/register" route', async () => {
    const route = '/register';
    const { findByTestId } = renderWithStore(<View />, {
      route,
    });

    const register = await findByTestId('register');

    expect(register).toBeTruthy();
  });

  it('Should redirect from "/register" if user is logged in', () => {
    const route = '/register';
    const initialState: Partial<AppState> = {
      user: {
        userData: { ...fakeUser },
        isLoading: false,
        isAuthenticated: true,
      },
    };
    const { history } = renderWithStore(<View />, {
      route,
      initialState,
    });
    expect(history.location.pathname).not.toBe(route);
  });

  it('Should handle "/pokemon" route', async () => {
    const route = '/pokemon';
    const { findByTestId } = renderWithStore(<View />, {
      route,
    });

    const pokemon = await findByTestId('pokemon-list');

    expect(pokemon).toBeTruthy();
  });

  it('Should handle "/pokemon/:id" route', async () => {
    const route = '/pokemon/2';
    const { findByTestId } = renderWithStore(<View />, { route });

    const pokemonSingleView = await findByTestId('pokemon-single-view');

    expect(pokemonSingleView).toBeTruthy();
  });

  it('Should handle "/teams" route', async () => {
    const route = '/teams';
    const { findByTestId } = renderWithStore(<View />, { route });

    const teams = await findByTestId('teams');

    expect(teams).toBeTruthy();
  });

  it('Should handle "/teams/:id" route', async () => {
    const route = '/teams/:id';
    const { findByTestId } = renderWithStore(<View />, { route });

    const teamSingleView = await findByTestId('team-single-view');

    expect(teamSingleView).toBeTruthy();
  });

  it('Should handle wrong route', async () => {
    const route = '/route-that-does-not-exist';
    const { findByTestId } = renderWithStore(<View />, { route });

    const wrongRoute = await findByTestId(/no_match/i);

    expect(wrongRoute).toBeTruthy();
  });
});
