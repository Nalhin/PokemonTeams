import * as React from 'react';
import Loading from '../../components/Loading/Loading';
import PokemonListSingleView from './PokemonListSingleItem';
import styled from '@emotion/styled';
import { PokemonListContainerProps } from './PokemonList.container';

const StyledPokemonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

interface PokemonListProps extends PokemonListContainerProps {}

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
