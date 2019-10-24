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
  testId?: string;
}

const PokemonSmall: React.FC<PokemonSmallProps> = ({
  pokemon,
  onClick,
  className,
  hideTooltip,
  testId,
}) => {
  return (
    <Tooltip title={pokemon.name} disableHoverListener={hideTooltip}>
      <StyledAvatar
        className={className}
        onClick={onClick}
        alt={pokemon.name}
        src={`/assets/icons/${pokemon.pokedexId}.png`}
        data-testid={testId}
      />
    </Tooltip>
  );
};

export default PokemonSmall;
