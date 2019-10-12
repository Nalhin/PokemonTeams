import * as React from 'react';
import { Pokemon } from '../../../interfaces/pokemon';
import PokemonSmall from '../../../components/PokemonSmall/PokemonSmall';
import styled from '@emotion/styled';

interface PickPokemonModalPokemonProps {
  pokemon: Pokemon;
  addPokemon: (pokemon: Pokemon) => void;
  roster: Pokemon[];
}

const StyledPokemonSmall = styled(PokemonSmall)`
  &:hover {
    cursor: pointer;
  }
`;

const PickPokemonModalPokemon: React.FC<PickPokemonModalPokemonProps> = ({
  pokemon,
  addPokemon,
  roster,
}) => {
  const handleAddPokemon = React.useCallback(() => addPokemon(pokemon), [
    pokemon._id,
    roster,
  ]);

  return (
    <StyledPokemonSmall
      hideTooltip
      onClick={handleAddPokemon}
      pokemon={pokemon}
    />
  );
};

export default PickPokemonModalPokemon;
