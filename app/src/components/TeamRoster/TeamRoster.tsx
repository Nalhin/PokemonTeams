import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import styled from '@emotion/styled';
import PokemonSmall from '../PokemonSmall/PokemonSmall';
import Typography from '@material-ui/core/Typography';
import { PADDING } from '../../styles/padding';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: ${PADDING.BASE} 0;
`;

const StyledTypography = styled(Typography)`
  margin: 0 auto;
  height: 40px;
  font-size: 16px;
`;

const StyledPokemonSmall = styled(PokemonSmall)`
  &:not(:first-of-type) {
    margin-left: ${PADDING.BASE};
  }
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
          <StyledPokemonSmall key={`${pokemon._id}#${i}`} pokemon={pokemon} />
        ))
      ) : (
        <StyledTypography
          variant="h5"
          component="h3"
          data-testid="team__roster--empty"
        >
          Empty roster
        </StyledTypography>
      )}
    </Container>
  );
};

TeamRoster.defaultProps = {
  roster: [],
};

export default TeamRoster;
