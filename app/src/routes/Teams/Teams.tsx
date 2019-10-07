import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { Team } from '../../interfaces/team';
import Loading from '../../components/Loading/Loading';
import TeamCard from '../../components/TeamCard/TeamCard';

interface TeamsProps extends RouteComponentProps {
  teams: Team[];
  isLoading: boolean;
  getTeams(): void;
}

const Teams: React.FC<TeamsProps> = ({
  teams,
  isLoading,
  getTeams,
  history,
}) => {
  React.useEffect(() => {
    getTeams();
  }, [getTeams]);

  const addTeam = () => {
    history.push('/teams/new');
  };

  return (
    <Loading isLoading={isLoading}>
      <div data-testid="teams">
        <button onClick={addTeam}>Draft Team</button>
        <div>
          {teams.map(team => (
            <TeamCard team={team} key={team._id} />
          ))}
        </div>
      </div>
    </Loading>
  );
};

export default withRouter(Teams);
