import React from 'react';
import PickPokemonModalPokemon from './PickPokemonModalPokemon';
import styled from '@emotion/styled';
import { Pokemon } from '../../../interfaces/pokemon';

const StyledContainer = styled.div`
  overflow: auto;
  height: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

interface PickPokemonModalPokemonListProps {
  pokemonData: Pokemon[];
  handleAddRoster: (pokemon: Pokemon) => void;
}

class PickPokemonModalPokemonList extends React.PureComponent<
  PickPokemonModalPokemonListProps
> {
  render() {
    return (
      <StyledContainer>
        {this.props.pokemonData.map(pokemon => (
          <PickPokemonModalPokemon
            pokemon={pokemon}
            addPokemon={this.props.handleAddRoster}
            key={pokemon._id}
          />
        ))}
      </StyledContainer>
    );
  }
}

export default PickPokemonModalPokemonList;
