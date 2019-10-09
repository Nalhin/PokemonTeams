import * as React from 'react';
import styled from '@emotion/styled';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { Pokemon } from '../../interfaces/pokemon';

const StyledContainer = styled.div``;

interface PokemonSmallProps {
  pokemon: Pokemon;
}

const PokemonSmall: React.FC<PokemonSmallProps> = ({ pokemon }) => {
  return (
    <StyledContainer>
      <span>pokemon.name</span>
      <img src={`./icons/${pokemon.pokedexId}.png`} alt={pokemon.name} />
      <Tooltip title="Remove Pokemon">
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </StyledContainer>
  );
};

export default PokemonSmall;
