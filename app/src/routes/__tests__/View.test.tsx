import * as React from 'react';
import { cleanup } from '@testing-library/react';
import View from '../View';
import { renderWithStore } from '../../../test/utils/renderWithStore';
import { AppState } from '../../store/rootReducer';
import { fakeUser } from '../../../test/fixtures/user';

jest.mock('../../components/PokemonModelViewer/PokemonModelViewer', () => {
  return () => <div />;
});

jest.mock('react-infinite-scroller'),
  () => {
    return () => <div />;
  };

describe('View Component', () => {
  afterEach(cleanup);

  it('Should handle "/" route', () => {
    const route = '/';
    const { getByTestId } = renderWithStore(<View />, {
      route,
    });

    expect(getByTestId('login')).toBeTruthy();
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
    const { queryByTestId } = renderWithStore(<View />, {
      route,
      initialState,
    });

    expect(queryByTestId('login')).toBeFalsy();
  });

  it('Should handle "/register" route', () => {
    const route = '/register';
    const { getByTestId } = renderWithStore(<View />, {
      route,
    });

    expect(getByTestId('register')).toBeTruthy();
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
    const { queryByTestId } = renderWithStore(<View />, {
      route,
      initialState,
    });

    expect(queryByTestId('register')).toBeFalsy();
  });

  it('Should handle "/pokemon" route', () => {
    const route = '/pokemon';
    const { getByTestId } = renderWithStore(<View />, {
      route,
    });

    expect(getByTestId('pokemon-list')).toBeTruthy();
  });

  it('Should handle "/pokemon/:id" route', () => {
    const route = '/pokemon/2';
    const { getByTestId } = renderWithStore(<View />, { route });

    expect(getByTestId('pokemon-single-view')).toBeTruthy();
  });

  it('Should handle "/teams" route', () => {
    const route = '/teams';
    const { getByTestId } = renderWithStore(<View />, { route });

    expect(getByTestId('teams')).toBeTruthy();
  });

  it('Should handle "/teams/:id" route', () => {
    const route = '/teams/:id';
    const { getByTestId } = renderWithStore(<View />, { route });

    expect(getByTestId('team-single-view')).toBeTruthy();
  });

  it('Should handle wrong route', () => {
    const route = '/route-that-does-not-exist';
    const { getByTestId } = renderWithStore(<View />, { route });

    expect(getByTestId(/no_match/i)).toBeTruthy();
  });
});
