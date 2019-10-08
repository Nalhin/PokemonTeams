import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';

const StyledSingleView = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

interface PokemonListSingleItem extends RouteComponentProps {
  pokemon: Pokemon;
  handleSetDraft: (pokemon: Pokemon) => void;
}

const PokemonListSingleView: React.FC<PokemonListSingleItem> = ({
  pokemon,
  handleSetDraft,
  history,
}) => {
  const redirectToPokemon = (): void => {
    history.push(`pokemon/${pokemon.pokedexId}`);
  };

  return (
    <StyledSingleView onClick={redirectToPokemon}>
      <span>{pokemon.name}</span>
      <img src={`./icons/${pokemon.pokedexId}.png`} alt={pokemon.name} />
      <button>Add</button>
    </StyledSingleView>
  );
};

export default withRouter(PokemonListSingleView);
