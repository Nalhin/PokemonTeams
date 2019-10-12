import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Teams from './Teams';
import { AppState } from '../../store/rootReducer';
import {
  deleteTeamRequested,
  getTeamsRequested,
} from '../../store/team/team.actions';
import { RootAction } from '../../store/rootAction';
import { ModalTypes } from '../../store/modal/modal.types';
import { openModal } from '../../store/modal/modal.actions';

const mapStateToProps = (state: AppState) => {
  const teams = state.team.teams.data;
  const isLoading = state.team.teams.isLoading;
  const userId = state.user.userId;
  return {
    teams,
    isLoading,
    userId,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      getTeams: getTeamsRequested,
      deleteTeam: deleteTeamRequested,
      openAddTeamModal: () => openModal(ModalTypes.addTeam),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Teams);

export type TeamsContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
