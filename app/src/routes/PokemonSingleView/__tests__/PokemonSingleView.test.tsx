import * as React from 'react';
import PokemonSingleView from '../PokemonSingleView';
import { fakePokemon } from '../../../../test/fixtures/pokemon';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import { cleanup } from '@testing-library/react';

jest.mock('../../../components/PokemonModelViewer/PokemonModelViewer', () => {
  return () => <div />;
});

describe('PokemonSingleView Component', () => {
  afterEach(cleanup);

  it('Should display Loading', () => {
    const { getByTestId } = renderWithRouter(
      <PokemonSingleView
        isLoading
        getPokemonById={jest.fn()}
        pokemon={fakePokemon}
      />,
    );

    expect(getByTestId('loading-spinner'));
  });
  it('Should fire getPokemonById on init', () => {
    const getPokemonById = jest.fn();
    renderWithRouter(
      <PokemonSingleView
        isLoading={false}
        getPokemonById={getPokemonById}
        pokemon={fakePokemon}
      />,
    );

    expect(getPokemonById).toHaveBeenCalledTimes(1);
  });

  it('Should display pokemon data', () => {
    const { getByText } = renderWithRouter(
      <PokemonSingleView
        isLoading={false}
        getPokemonById={jest.fn()}
        pokemon={fakePokemon}
      />,
    );

    expect(getByText(fakePokemon.name)).toBeTruthy();
    expect(getByText(fakePokemon.tags[0])).toBeTruthy();
    expect(getByText(`${fakePokemon.hp}`)).toBeTruthy();
    expect(getByText(`${fakePokemon.speed}`)).toBeTruthy();
  });
});
