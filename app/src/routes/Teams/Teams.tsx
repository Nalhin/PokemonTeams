import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import TeamCard from '../../components/TeamCard/TeamCard';
import { TeamsContainerProps } from './Teams.container';
import styled from '@emotion/styled';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;

interface TeamsProps extends RouteComponentProps, TeamsContainerProps {}

const Teams: React.FC<TeamsProps> = ({
  teams,
  isLoading,
  getTeams,
  deleteTeam,
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
        <StyledContainer>
          {teams.map(team => (
            <TeamCard
              team={team}
              key={team._id}
              userId={userId}
              deleteTeam={deleteTeam}
            />
          ))}
        </StyledContainer>
      </div>
    </Loading>
  );
};

export default withRouter(Teams);
