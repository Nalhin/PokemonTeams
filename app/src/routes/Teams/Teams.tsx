import * as React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import Loading from '../../components/Loading/Loading';
import TeamCard from '../../components/TeamCard/TeamCard';
import AddIcon from '@material-ui/icons/Add';
import { TeamsContainerProps } from './Teams.container';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import LazyLoading from '../../components/Loading/LazyLoading';
import ZoomFab from '../../components/ZoomFab/ZoomFab';

const StyledContainer = styled(InfiniteScroll)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 90%;
  margin: 0 auto;
`;

const StyledZoomFab = styled(ZoomFab)`
  bottom: ${PADDING.BASE};
  right: ${PADDING.BASE};
`;

const StyledLazyLoading = styled(LazyLoading)`
  grid-column: 1 / -1;
`;

interface TeamsProps extends TeamsContainerProps {}

const LOAD_AMOUNT = 10;

const Teams: React.FC<TeamsProps> = ({
  teams,
  isLoading,
  getTeams,
  openAddTeamModal,
  loaded,
  loadMoreTeams,
}) => {
  React.useEffect(() => {
    getTeams();
  }, [getTeams]);

  const handleLoadedChange = () => {
    loadMoreTeams(LOAD_AMOUNT);
  };

  const hasMore = loaded < teams.length;

  const items = teams
    .slice(0, loaded)
    .map(team => <TeamCard team={team} key={team._id} />);

  return (
    <Loading isLoading={isLoading}>
      <StyledContainer
        loadMore={handleLoadedChange}
        hasMore={hasMore}
        loader={<StyledLazyLoading key={loaded} />}
        data-testid="teams"
      >
        {items}
      </StyledContainer>
      <StyledZoomFab
        onClick={openAddTeamModal}
        icon={<AddIcon data-testid="teams__add-team" />}
      />
    </Loading>
  );
};

export default Teams;
