import * as React from 'react';
import { Team } from '../../interfaces/team';
import TeamEditButton from './TeamEditButton';

interface TeamCardProps {
  team: Team;
  userId: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, userId }) => {
  const isMine = userId === team.ownerId;
  return (
    <div>
      <div>type: {team.type}</div>
      <div>name: {team.name}</div>
      <div>description {team.description}</div>
      <div>rooster:{team.roster}</div>
      {isMine && <TeamEditButton id={team._id} />}
    </div>
  );
};

export default TeamCard;
