import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import TeamCard from '../../components/TeamCard/TeamCard';
import { TeamsContainerProps } from './Teams.container';

interface TeamsProps extends RouteComponentProps, TeamsContainerProps {}

const Teams: React.FC<TeamsProps> = ({
  teams,
  isLoading,
  getTeams,
  history,
  userId,
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
            <TeamCard team={team} key={team._id} userId={userId} />
          ))}
        </div>
      </div>
    </Loading>
  );
};

export default withRouter(Teams);
