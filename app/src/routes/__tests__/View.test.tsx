import * as React from 'react';
import { cleanup } from '@testing-library/react';
import View from '../View';
import { renderWithStore } from '../../../test/utils/renderWithStore';
import { authorizeUserRequested } from '../../store/user/user.actions';

jest.mock('../../components/PokemonModelViewer/PokemonModelViewer', () => {
  return () => <div />;
});

const authorizeUser = () => authorizeUserRequested();

describe('View Component', () => {
  afterEach(cleanup);

  it('Should handle "/pokemon" route', () => {
    const route = '/pokemon';
    const { getByTestId } = renderWithStore(
      <View authorizeUser={authorizeUser} />,
      {
        route,
      },
    );

    expect(getByTestId(/pokemon_list/i)).toBeTruthy();
  });
  it('Should handle "/pokemon/:id" route', () => {
    const route = '/pokemon/2';
    const { getByTestId } = renderWithStore(
      <View authorizeUser={authorizeUser} />,
      { route },
    );

    expect(getByTestId(/pokemon_single_view/i)).toBeTruthy();
  });

  it('Should handle "/team" route', () => {
    const route = '/teams';
    const { getByTestId } = renderWithStore(
      <View authorizeUser={authorizeUser} />,
      { route },
    );

    expect(getByTestId(/teams/i)).toBeTruthy();
  });
  it('Should handle "/teams/:id" route', () => {
    const route = '/teams/:id';
    const { getByTestId } = renderWithStore(
      <View authorizeUser={authorizeUser} />,
      { route },
    );

    expect(getByTestId(/team_single_view/i)).toBeTruthy();
  });
  it('Should handle wrong route', () => {
    const route = '/route-that-does-not-exist';
    const { getByTestId } = renderWithStore(
      <View authorizeUser={authorizeUser} />,
      { route },
    );

    expect(getByTestId(/no_match/i)).toBeTruthy();
  });
});
