import * as React from 'react';
import { Team, TeamType } from '../../interfaces/team';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import styled from '@emotion/styled';
import { TEAM_COLORS } from '../../styles/colors';
import { PADDING } from '../../styles/padding';
import TeamRoster from '../TeamRoster/TeamRooster';

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

interface TeamCardProps extends RouteComponentProps {
  team: Team;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, history }) => {
  const handleTeamClick = () => {
    history.push(`/teams/${team._id}`);
  };

  return (
    <StyledCard type={team.type} onClick={handleTeamClick}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {team.name}
        </Typography>
        <Typography variant="body2" component="p">
          {team.description}
        </Typography>
        <TeamRoster roster={team.roster} />
      </CardContent>
    </StyledCard>
  );
};

export default withRouter(TeamCard);
