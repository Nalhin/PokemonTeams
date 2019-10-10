import * as React from 'react';
import Loading from '../../components/Loading/Loading';
import styled from '@emotion/styled';
import { PokemonListContainerProps } from './PokemonList.container';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const StyledPokemonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
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
          <PokemonCard pokemon={pokemon} key={pokemon.pokedexId} />
        ))}
      </StyledPokemonContainer>
    </Loading>
  );
};

export default PokemonList;
