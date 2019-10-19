import * as React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import PokemonSmall from '../PokemonSmall';
import { fakePokemon } from '../../../../test/fixtures/pokemon';

describe('PokemonSmall Component', () => {
  afterEach(cleanup);
  it('Should fire onClick event when avatar is clicked', () => {
    const onClick = jest.fn();
    const { getByAltText } = render(
      <PokemonSmall pokemon={fakePokemon} onClick={onClick} />,
    );
    const avatar = getByAltText(fakePokemon.name);

    fireEvent.click(avatar);

    expect(onClick).toBeCalledTimes(1);
  });
});
