import * as React from 'react';
import { Pokemon } from '../../../../interfaces/pokemon';
import PokemonSmall from '../../../../components/PokemonSmall/PokemonSmall';
import styled from '@emotion/styled';

interface PickPokemonModalPokemonProps {
  pokemon: Pokemon;
  addPokemon: (pokemon: Pokemon) => void;
}

const StyledPokemonSmall = styled(PokemonSmall)`
  &:hover {
    cursor: pointer;
  }
`;

const PickerPokemon: React.FC<PickPokemonModalPokemonProps> = ({
  pokemon,
  addPokemon,
}) => {
  const handleAddPokemon = React.useCallback(() => addPokemon(pokemon), [
    pokemon._id,
  ]);

  return (
    <StyledPokemonSmall
      hideTooltip
      onClick={handleAddPokemon}
      pokemon={pokemon}
      testId="roster-modal__picker-pokemon"
    />
  );
};

export default PickerPokemon;
