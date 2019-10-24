import React from 'react';
import PickerPokemon from './PickerPokemon';
import styled from '@emotion/styled';
import { Pokemon } from '../../../../interfaces/pokemon';

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

const PickerPokemonList: React.FC<PickPokemonModalPokemonListProps> = ({
  pokemonData,
  handleAddRoster,
}) => {
  return (
    <StyledContainer>
      {pokemonData.map(pokemon => (
        <PickerPokemon
          pokemon={pokemon}
          addPokemon={handleAddRoster}
          key={pokemon._id}
        />
      ))}
    </StyledContainer>
  );
};

export default React.memo(PickerPokemonList);
