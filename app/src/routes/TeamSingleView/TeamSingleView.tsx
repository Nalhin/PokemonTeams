import * as React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { TeamSingleViewContainerProps } from './TeamSingleView.container';
import Loading from '../../components/Loading/Loading';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { PADDING } from '../../styles/padding';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { TeamType } from '../../interfaces/team';
import { TEAM_COLORS } from '../../styles/colors';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import ZoomFab from '../../components/ZoomFab/ZoomFab';

const StyledEditFab = styled(ZoomFab)`
  bottom: ${PADDING.BASE};
  right: ${PADDING.BASE};
`;

const StyledDeleteFab = styled(ZoomFab)`
  bottom: ${PADDING.BASE};
  left: ${PADDING.BASE};
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
  padding: ${PADDING.BASE};
  margin: ${PADDING.LARGE} auto;
`;

const StyledTypography = styled(Typography)`
  text-align: center;
`;

const StyledOwner = styled(Typography)`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
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
  deleteTeam,
  team,
  history,
}) => {
  React.useEffect(() => {
    getTeam(match.params.id);
  }, [getTeam]);

  const handleDeleteTeam = () => {
    deleteTeam(match.params.id, history);
  };

  const { roster, description, owner, type, name } = team;

  return (
    <Loading isLoading={isLoading}>
      <StyledPaper data-testid="team_single_view" type={type}>
        <StyledTypography variant="h5" component="h2">
          {name}
        </StyledTypography>
        <StyledTypography variant="h6" component="h3">
          {description}
        </StyledTypography>
        <StyledPokemonContainer>
          {roster &&
            roster.map((pokemon, i) => (
              <PokemonCard pokemon={pokemon} key={i} />
            ))}
        </StyledPokemonContainer>
        <StyledOwner variant="body2" component="p">
          {owner && owner.login}
        </StyledOwner>
      </StyledPaper>
      <StyledDeleteFab icon={<DeleteIcon />} onClick={handleDeleteTeam}>
        <DeleteIcon />
      </StyledDeleteFab>
      <StyledEditFab icon={<EditIcon />} onClick={openEditTeamModal} />
    </Loading>
  );
};

export default withRouter(TeamSingleView);
