import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import Loading from '../../components/Loading/Loading';
import TeamCard from '../../components/TeamCard/TeamCard';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { TeamsContainerProps } from './Teams.container';
import styled from '@emotion/styled';
import { COLORS } from '../../styles/colors';
import { PADDING } from '../../styles/padding';
import LazyLoading from '../../components/Loading/LazyLoading';

const StyledContainer = styled(InfiniteScroll)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;

const StyledFab = styled(Fab)`
  position: fixed;
  bottom: ${PADDING.BASE};
  right: ${PADDING.BASE};
  background: ${COLORS.MAIN};
  color: #fff;
  &:hover {
    background: ${COLORS.MAIN_SECONDARY};
  }
`;

interface TeamsProps extends TeamsContainerProps {}

const LOAD_AMOUNT = 10;
const INITIAL_LOAD = 20;

const Teams: React.FC<TeamsProps> = ({
  teams,
  isLoading,
  getTeams,
  deleteTeam,
  openAddTeamModal,
  userId,
}) => {
  const [loaded, setLoaded] = React.useState(INITIAL_LOAD);

  React.useEffect(() => {
    getTeams();
  }, [getTeams]);

  const handleLoadedChange = () => {
    setLoaded(loaded + LOAD_AMOUNT);
  };

  const hasMore = loaded < teams.length;

  const items = [...teams.slice(0, loaded)].map(team => (
    <TeamCard
      team={team}
      key={team._id}
      userId={userId}
      deleteTeam={deleteTeam}
    />
  ));

  return (
    <Loading isLoading={isLoading}>
      <div data-testid="teams">
        <StyledContainer
          loadMore={handleLoadedChange}
          hasMore={hasMore}
          loader={<LazyLoading key={loaded} />}
        >
          {items}
        </StyledContainer>
        <StyledFab onClick={openAddTeamModal}>
          <AddIcon />
        </StyledFab>
      </div>
    </Loading>
  );
};

export default Teams;
