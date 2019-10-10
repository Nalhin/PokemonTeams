import * as React from 'react';
import { Team, TeamType } from '../../interfaces/team';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import styled from '@emotion/styled';
import { TEAM_COLORS } from '../../styles/colors';
import { PADDING } from '../../styles/padding';
import PokemonSmall from '../PokemonSmall/PokemonSmall';
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
`;

interface TeamCardProps extends RouteComponentProps {
  team: Team;
  userId: string;
  deleteTeam: (teamId: string) => void;
}

const TeamCard: React.FC<TeamCardProps> = ({
  team,
  userId,
  deleteTeam,
  history,
}) => {
  const isMine = userId === team.ownerId;
  const handleDeleteTeam = React.useCallback(() => deleteTeam(team._id), [
    team._id,
  ]);
  const handleEditTeam = () => {
    history.push(`/teams/edit/${team._id}`);
  };

  return (
    <StyledCard type={team.type}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {team.name}
        </Typography>
        <Typography variant="body2" component="p">
          {team.description}
        </Typography>
        <TeamRoster roster={team.roster} />
        {isMine && (
          <CardActions disableSpacing>
            <IconButton onClick={handleDeleteTeam}>
              <DeleteForeverIcon />
            </IconButton>
            <IconButton onClick={handleEditTeam}>
              <EditIcon />
            </IconButton>
          </CardActions>
        )}
      </CardContent>
    </StyledCard>
  );
};

export default withRouter(TeamCard);
