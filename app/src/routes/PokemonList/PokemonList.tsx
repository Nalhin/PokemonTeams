import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../../components/Loading/Loading';
import styled from '@emotion/styled';
import { PokemonListContainerProps } from './PokemonList.container';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import LazyLoading from '../../components/Loading/LazyLoading';

const StyledPokemonContainer = styled(InfiniteScroll)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;

interface PokemonListProps extends PokemonListContainerProps {}

const LOAD_AMOUNT = 50;

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonData,
  isLoading,
  getAllPokemon,
  loadMorePokemon,
  loaded,
}) => {
  React.useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  const handleLoadedChange = () => {
    loadMorePokemon(LOAD_AMOUNT);
  };

  const hasMore = loaded < pokemonData.length;

  const items = pokemonData
    .slice(0, loaded)
    .map(pokemon => <PokemonCard pokemon={pokemon} key={pokemon.pokedexId} />);

  return (
    <Loading isLoading={isLoading}>
      <StyledPokemonContainer
        data-testid="pokemon-list"
        loadMore={handleLoadedChange}
        hasMore={hasMore}
        loader={<LazyLoading key={loaded} />}
      >
        {items}
      </StyledPokemonContainer>
    </Loading>
  );
};

export default PokemonList;
