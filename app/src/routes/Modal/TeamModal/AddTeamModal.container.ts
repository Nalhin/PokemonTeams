import { AppState } from '../../../store/rootReducer';
import { ModalTypes } from '../../../store/modal/modal.types';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import {
  closeModal,
  openModal,
  setRosterModal,
  setTeamModal,
} from '../../../store/modal/modal.actions';
import { connect } from 'react-redux';
import { saveTeamRequested } from '../../../store/team/team.actions';
import TeamModal from './TeamModal';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.team.addTeam.isLoading;
  const teamState = state.modal.teamModal.team;
  return {
    isLoading,
    teamState,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      onConfirm: saveTeamRequested,
      closeModal: () => closeModal(ModalTypes.addTeam),
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

export type AddTeamModalContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
