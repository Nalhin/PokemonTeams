import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../../components/Loading/Loading';
import styled from '@emotion/styled';
import { PokemonListContainerProps } from './PokemonList.container';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import LazyLoading from '../../components/Loading/LazyLoading';
import { PADDING } from '../../styles/padding';
import { POKEMON_MAX_WIDTH } from '../../styles/sizes';

const StyledPokemonContainer = styled(InfiniteScroll)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(${POKEMON_MAX_WIDTH}, 1fr));
  grid-gap: ${PADDING.LARGE};
  width: 90%;
  margin: ${PADDING.LARGE} auto;
`;

const StyledLazyLoading = styled(LazyLoading)`
  grid-column: 1 / -1;
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
        loader={<StyledLazyLoading key={loaded} />}
      >
        {items}
      </StyledPokemonContainer>
    </Loading>
  );
};

export default PokemonList;
