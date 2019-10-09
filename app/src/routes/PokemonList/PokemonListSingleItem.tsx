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
  isDraft: boolean;
  handleSetDraft: (pokemon: Pokemon) => void;
}

const PokemonListSingleView: React.FC<PokemonListSingleItem> = ({
  pokemon,
  isDraft,
  handleSetDraft,
  history,
}) => {
  const addToDraft = () => {
    handleSetDraft(pokemon);
  };

  const redirectToPokemon = (): void => {
    history.push(`/pokemon/${pokemon.pokedexId}`);
  };

  return (
    <StyledSingleView>
      <span>{pokemon.name}</span>
      <img
        onClick={redirectToPokemon}
        src={`./icons/${pokemon.pokedexId}.png`}
        alt={pokemon.name}
      />
      {isDraft && <button onClick={addToDraft}>Add</button>}
    </StyledSingleView>
  );
};

export default withRouter(PokemonListSingleView);
