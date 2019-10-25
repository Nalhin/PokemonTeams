import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import PokemonList from '../PokemonList';
import { fakePokemon } from '../../../../test/fixtures/pokemon';
import { Pokemon } from '../../../interfaces/pokemon';

const props = {
  pokemonData: [fakePokemon],
  isLoading: false,
  getAllPokemon: jest.fn(),
  loadMorePokemon: jest.fn(),
  loaded: 50,
};

describe('PokemonList Component', () => {
  it('Should display Loading', () => {
    const { getByTestId } = renderWithRouter(
      <PokemonList {...props} isLoading />,
    );

    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeTruthy();
  });

  it('Should fire getAllPokemon', () => {
    const getAllPokemon = jest.fn();
    const pokemonData: Pokemon[] = [];

    renderWithRouter(
      <PokemonList
        {...props}
        getAllPokemon={getAllPokemon}
        pokemonData={pokemonData}
      />,
    );

    expect(getAllPokemon).toHaveBeenCalledTimes(1);
  });

  it('Should not fire getAllPokemon if pokemonData is already cached', () => {
    const getAllPokemon = jest.fn();
    const pokemonData: Pokemon[] = [fakePokemon];

    renderWithRouter(
      <PokemonList
        {...props}
        getAllPokemon={getAllPokemon}
        pokemonData={pokemonData}
      />,
    );

    expect(getAllPokemon).toHaveBeenCalledTimes(0);
  });
});
