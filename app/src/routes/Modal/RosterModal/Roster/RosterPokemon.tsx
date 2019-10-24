import * as React from 'react';
import { Pokemon } from '../../../../interfaces/pokemon';
import PokemonSmall from '../../../../components/PokemonSmall/PokemonSmall';
import styled from '@emotion/styled';
import { PADDING } from '../../../../styles/padding';

const StyledPokemonSmall = styled(PokemonSmall)`
  &:not(:first-of-type) {
    margin-left: ${PADDING.BASE};
  }
  &:hover {
    cursor: pointer;
    background: red;
  }
`;

interface PickPokemonModalPokemonProps {
  pokemon: Pokemon;
  removePokemon: (index: number) => void;
  index: number;
}

const RosterPokemon: React.FC<PickPokemonModalPokemonProps> = ({
  pokemon,
  removePokemon,
  index,
}) => {
  const handleAddPokemon = React.useCallback(() => removePokemon(index), [
    index,
  ]);

  return (
    <StyledPokemonSmall
      hideTooltip
      onClick={handleAddPokemon}
      pokemon={pokemon}
      testId="roster-modal__roster-pokemon"
    />
  );
};

export default RosterPokemon;
