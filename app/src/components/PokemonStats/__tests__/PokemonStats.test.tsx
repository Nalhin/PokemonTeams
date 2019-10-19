import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import PokemonStats from '../PokemonStats';
import { fakePokemon } from '../../../../test/fixtures/pokemon';

describe('PokemonStats Component', () => {
  beforeEach(cleanup);

  it('Should display all stats', () => {
    const { getByText } = render(<PokemonStats {...fakePokemon} />);

    expect(getByText(`${fakePokemon.hp}`)).toBeTruthy();
    expect(getByText(`${fakePokemon.attack}`)).toBeTruthy();
    expect(getByText(`${fakePokemon.defense}`)).toBeTruthy();
    expect(getByText(`${fakePokemon.spellAttack}`)).toBeTruthy();
    expect(getByText(`${fakePokemon.spellDefense}`)).toBeTruthy();
    expect(getByText(`${fakePokemon.speed}`)).toBeTruthy();
  });

  it('Should display total', () => {
    const { getByText } = render(<PokemonStats {...fakePokemon} />);

    expect(getByText(new RegExp(`${fakePokemon.total}`))).toBeTruthy();
  });
});
