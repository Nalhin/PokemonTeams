import * as React from 'react';
import styled from '@emotion/styled';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

import { Pokemon } from '../../interfaces/pokemon';

const StyledAvatar = styled(Avatar)`
  width: 40px;
  height: 40px;
`;

interface PokemonSmallProps {
  pokemon: Pokemon;
  className?: string;
  onClick?: () => any;
  hideTooltip?: boolean;
}

const PokemonSmall: React.FC<PokemonSmallProps> = ({
  pokemon,
  onClick,
  className,
  hideTooltip,
}) => {
  return (
    <Tooltip title={pokemon.name} disableHoverListener={hideTooltip}>
      <StyledAvatar
        className={className}
        onClick={onClick}
        alt={pokemon.name}
        src={`/icons/${pokemon.pokedexId}.png`}
      />
    </Tooltip>
  );
};

export default PokemonSmall;
