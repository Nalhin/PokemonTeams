import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import {
  closeModal,
  openModal,
  setRosterModal,
  setTeamModal,
} from '../../../store/modal/modal.actions';
import { ModalTypes } from '../../../store/modal/modal.types';
import { connect } from 'react-redux';
import { editTeamRequested } from '../../../store/team/team.actions';
import { AppState } from '../../../store/rootReducer';
import TeamModal from './TeamModal';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.team.editTeam.isLoading;
  const teamState = state.modal.teamModal.team;
  return {
    teamState,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      onConfirm: editTeamRequested,
      closeModal: () => closeModal(ModalTypes.editTeam),
      openModal,
      setRosterModal,
      setTeamModal,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  // @ts-ignore
)(TeamModal);

export type EditTeamModalContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
