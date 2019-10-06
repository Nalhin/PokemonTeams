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
}

const PokemonListSingleView: React.FC<PokemonListSingleItem> = ({
  pokemon,
  history,
}) => {
  const redirectToPokemon = (): void => {
    history.push(`pokemon/${pokemon.id}`);
  };

  return (
    <StyledSingleView onClick={redirectToPokemon}>
      <span>{pokemon.name}</span>
      <img src={`./icons/${pokemon.id}.png`} alt={pokemon.name} />
    </StyledSingleView>
  );
};

export default withRouter(PokemonListSingleView);
