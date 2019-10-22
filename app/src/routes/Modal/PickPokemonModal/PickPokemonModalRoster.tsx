import React from 'react';
import { Pokemon } from '../../../interfaces/pokemon';
import PickPokemonModalRosterPokemon from './PickPokemonModalRosterPokemon';
import styled from '@emotion/styled';
import { PADDING } from '../../../styles/padding';
import Typography from '@material-ui/core/Typography';

interface PickPokemonModalRoster {
  roster: Pokemon[];
  handleRemoveRoster: (index: number) => void;
}

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

const PickPokemonModalRoster: React.FC<PickPokemonModalRoster> = ({
  roster,
  handleRemoveRoster,
}) => {
  return (
    <Container>
      {roster.length ? (
        roster.map((pokemon, index) => (
          <PickPokemonModalRosterPokemon
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

export default PickPokemonModalRoster;
