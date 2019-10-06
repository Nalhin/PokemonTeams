import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import Loading from '../../components/Loading/Loading';
import PokemonListSingleView from './PokemonListSingleItem';
import styled from '@emotion/styled';

const StyledPokemonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface PokemonListProps {
  pokemonData: Pokemon[];
  isLoading: boolean;
  getAllPokemon(): void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonData,
  isLoading,
  getAllPokemon,
}) => {
  React.useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  return (
    <Loading isLoading={isLoading}>
      <StyledPokemonContainer data-testid="pokemon_list">
        {pokemonData.map(pokemon => (
          <PokemonListSingleView pokemon={pokemon} key={pokemon.pokedexId} />
        ))}
      </StyledPokemonContainer>
    </Loading>
  );
};

export default PokemonList;
