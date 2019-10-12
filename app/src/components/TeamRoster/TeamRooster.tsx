import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import styled from '@emotion/styled';
import PokemonSmall from '../PokemonSmall/PokemonSmall';
import Typography from '@material-ui/core/Typography';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledTypography = styled(Typography)`
  margin: 0 auto;
  height: 40px;
`;

interface TeamRosterProps {
  roster: Pokemon[];
  className?: string;
}

const TeamRoster: React.FC<TeamRosterProps> = ({ roster, className }) => {
  return (
    <Container className={className}>
      {roster.length ? (
        roster.map((pokemon, i) => (
          <PokemonSmall key={`${pokemon._id}#${i}`} pokemon={pokemon} />
        ))
      ) : (
        <StyledTypography variant="h5" component="h3">
          Empty roster
        </StyledTypography>
      )}
    </Container>
  );
};

export default TeamRoster;
