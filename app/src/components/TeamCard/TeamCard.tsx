import * as React from 'react';
import { Team } from '../../interfaces/team';
import TeamEditButton from './TeamEditButton';

interface TeamCardProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div>
      <div>type: {team.type}</div>
      <div>name: {team.name}</div>
      <div>description {team.description}</div>
      <div>rooster:{team.roster}</div>
      <TeamEditButton id={team._id} />
    </div>
  );
};

export default TeamCard;
