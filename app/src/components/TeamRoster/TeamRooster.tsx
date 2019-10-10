import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import styled from '@emotion/styled';
import PokemonSmall from '../PokemonSmall/PokemonSmall';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

interface TeamRosterProps {
  roster: Pokemon[];
}

const TeamRoster: React.FC<TeamRosterProps> = ({ roster }) => {
  return (
    <Container>
      {roster.map(pokemon => (
        <PokemonSmall pokemon={pokemon} />
      ))}
    </Container>
  );
};

export default TeamRoster;
