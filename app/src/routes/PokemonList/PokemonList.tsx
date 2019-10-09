import * as React from 'react';
import Loading from '../../components/Loading/Loading';
import PokemonListSingleView from './PokemonListSingleItem';
import styled from '@emotion/styled';
import { PokemonListContainerProps } from './PokemonList.container';
import { Pokemon } from '../../interfaces/pokemon';
import produce from 'immer';

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
  setDraft,
  draftTeam,
}) => {
  React.useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  const handleSetDraft = (pokemon: Pokemon) => {
    const nextState = produce(draftTeam, draftState => {
      draftState.roster.push(pokemon);
    });
    setDraft(nextState);
  };

  const isDraft = !!draftTeam._id;

  return (
    <Loading isLoading={isLoading}>
      <StyledPokemonContainer data-testid="pokemon_list">
        {pokemonData.map(pokemon => (
          <PokemonListSingleView
            pokemon={pokemon}
            key={pokemon.pokedexId}
            handleSetDraft={handleSetDraft}
            isDraft={isDraft}
          />
        ))}
      </StyledPokemonContainer>
    </Loading>
  );
};

export default PokemonList;
