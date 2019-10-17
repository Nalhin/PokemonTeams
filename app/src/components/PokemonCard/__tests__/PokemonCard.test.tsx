import { cleanup, fireEvent } from '@testing-library/react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import * as React from 'react';
import { createMemoryHistory } from 'history';
import { fakePokemon } from '../../../../test/fixtures/pokemon';
import PokemonCard from '../PokemonCard';

describe('PokemonCard Component', () => {
  afterEach(cleanup);

  it('Should display data correctly', () => {
    const { getByText } = renderWithRouter(
      <PokemonCard pokemon={fakePokemon} />,
    );

    expect(getByText(fakePokemon.name)).toBeTruthy();
    expect(getByText(`#${fakePokemon.pokedexId}`)).toBeTruthy();
    expect(getByText(fakePokemon.tags[0])).toBeTruthy();
  });

  it('Should redirect to pokemon onClick', () => {
    const route = '/test';
    const history = createMemoryHistory({ initialEntries: [route] });
    const { getByText } = renderWithRouter(
      <PokemonCard pokemon={fakePokemon} />,
      { route, history },
    );

    fireEvent.click(getByText(fakePokemon.name));

    expect(history.location.pathname).toEqual(
      `/pokemon/${fakePokemon.pokedexId}`,
    );
  });
});
