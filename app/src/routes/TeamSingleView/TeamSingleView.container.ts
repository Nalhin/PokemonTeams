import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import {
  deleteTeamRequested,
  getTeamByIdRequested,
} from '../../store/team/team.actions';
import { connect } from 'react-redux';
import TeamSingleView from './TeamSingleView';
import { openModal } from '../../store/modal/modal.actions';
import { ModalTypes } from '../../store/modal/modal.types';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.team.current.isLoading;
  const team = state.team.current.team;
  return {
    isLoading,
    team,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      getTeam: getTeamByIdRequested,
      deleteTeam: deleteTeamRequested,
      openEditTeamModal: () => openModal(ModalTypes.editTeam),
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TeamSingleView);

export type TeamSingleViewContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
