import * as React from 'react';
import styled from '@emotion/styled';
import StatBar from './StatBar';
import Typography from '@material-ui/core/Typography';

interface PokemonStatsProps {
  hp: number;
  attack: number;
  defense: number;
  spellAttack: number;
  spellDefense: number;
  speed: number;
  total: number;
}

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledBarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 auto;
`;

const PokemonStats: React.FC<PokemonStatsProps> = ({
  hp,
  attack,
  defense,
  spellAttack,
  spellDefense,
  speed,
  total,
}) => {
  return (
    <div>
      <StyledHeader>
        <Typography component="legend">Stats</Typography>
        <Typography component="legend">Total {total}</Typography>
      </StyledHeader>
      <StyledBarContainer>
        <StatBar name="Health Points" shortName="HP" data={hp} />
        <StatBar name="Attack Power" shortName="AP" data={attack} />
        <StatBar name="Defense" shortName="DF" data={defense} />
        <StatBar name="Spell Attack Power" shortName="SAP" data={spellAttack} />
        <StatBar name="Spell Defense" shortName="SDF" data={spellDefense} />
        <StatBar name="Speed" shortName="SPD" data={speed} />
      </StyledBarContainer>
    </div>
  );
};

export default PokemonStats;
