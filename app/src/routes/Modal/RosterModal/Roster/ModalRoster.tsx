import React from 'react';
import { Pokemon } from '../../../../interfaces/pokemon';
import RosterPokemon from './RosterPokemon';
import styled from '@emotion/styled';
import { PADDING } from '../../../../styles/padding';
import Typography from '@material-ui/core/Typography';

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
interface ModalRosterProps {
  roster: Pokemon[];
  handleRemoveRoster: (index: number) => void;
}

const ModalRoster: React.FC<ModalRosterProps> = ({
  roster,
  handleRemoveRoster,
}) => {
  return (
    <Container>
      {roster.length ? (
        roster.map((pokemon, index) => (
          <RosterPokemon
            pokemon={pokemon}
            index={index}
            key={index}
            removePokemon={handleRemoveRoster}
          />
        ))
      ) : (
        <StyledTypography
          variant="h5"
          component="h3"
          data-testid="team__roster--empty"
        >
          Add Pokemon
        </StyledTypography>
      )}
    </Container>
  );
};

export default ModalRoster;
