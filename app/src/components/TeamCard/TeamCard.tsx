import * as React from 'react';
import { Team, TeamType } from '../../interfaces/team';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import { TEAM_COLORS } from '../../styles/team';
import { PADDING } from '../../styles/padding';
import TeamRoster from '../TeamRoster/TeamRoster';

type StyledFormControlLabelProps = {
  type: TeamType;
};

const StyledCard = styled(Card)`
  background: ${(props: StyledFormControlLabelProps) =>
    ` ${TEAM_COLORS[props.type]}44`};
  max-width: 450px;
  min-width: 300px;
  margin: ${PADDING.BASE};
  &:hover {
    cursor: pointer;
    background: ${(props: StyledFormControlLabelProps) =>
      ` ${TEAM_COLORS[props.type]}22`};
  }
`;

const StyledOwner = styled(Typography)`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
`;

interface TeamCardProps extends RouteComponentProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, history }) => {
  const handleTeamClick = () => {
    history.push(`/teams/${team._id}`);
  };

  const { roster, description, owner, type, name } = team;
  const { login } = owner;
  return (
    <StyledCard type={type} onClick={handleTeamClick} data-testid="team__card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
        <TeamRoster roster={roster} />
        <StyledOwner variant="body2" component="p">
          {login}
        </StyledOwner>
      </CardContent>
    </StyledCard>
  );
};

export default withRouter(TeamCard);
