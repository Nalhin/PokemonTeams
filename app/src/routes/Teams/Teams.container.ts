import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Teams from './Teams';
import { AppState } from '../../store/rootReducer';
import {
  getTeamsRequested,
  loadMoreTeams,
} from '../../store/team/team.actions';
import { RootAction } from '../../store/rootAction';
import { ModalTypes } from '../../store/modal/modal.types';
import { openModal } from '../../store/modal/modal.actions';

const mapStateToProps = (state: AppState) => {
  const teams = state.team.teams.data;
  const isLoading = state.team.teams.isLoading;
  const loaded = state.team.teams.loaded;
  return {
    teams,
    isLoading,
    loaded,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      getTeams: getTeamsRequested,
      openAddTeamModal: () => openModal(ModalTypes.addTeam),
      loadMoreTeams,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);

export type TeamsContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
