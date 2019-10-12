import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { TeamSingleViewContainerProps } from './TeamSingleView.container';
import Loading from '../../components/Loading/Loading';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import { PADDING } from '../../styles/padding';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TeamType } from '../../interfaces/team';
import { TEAM_COLORS } from '../../styles/colors';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: ${PADDING.BASE};
  right: ${PADDING.BASE};
`;

const StyledPokemonContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

type StyledFormControlLabelProps = {
  type: TeamType;
};

const StyledPaper = styled(Paper)`
  background: ${(props: StyledFormControlLabelProps) =>
    ` ${TEAM_COLORS[props.type]}44`};
  width: 90%;
  margin: 0 auto;
`;

interface RouterProps {
  id: string;
}

interface TeamSingleViewProps
  extends TeamSingleViewContainerProps,
    RouteComponentProps<RouterProps> {}

const TeamSingleView: React.FC<TeamSingleViewProps> = ({
  getTeam,
  isLoading,
  match,
  openEditTeamModal,
  team,
}) => {
  React.useEffect(() => {
    getTeam(match.params.id);
  }, [getTeam]);

  const { roster, description, type, name } = team;
  return (
    <Loading isLoading={isLoading}>
      <StyledPaper data-testid="team_single_view" type={type}>
        <Typography variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="h6" component="h3">
          {description}
        </Typography>
        <StyledPokemonContainer>
          {roster &&
            roster.map((pokemon, i) => (
              <PokemonCard pokemon={pokemon} key={i} />
            ))}
        </StyledPokemonContainer>
      </StyledPaper>
      <StyledFab color="secondary" onClick={openEditTeamModal}>
        <EditIcon />
      </StyledFab>
    </Loading>
  );
};

export default withRouter(TeamSingleView);
