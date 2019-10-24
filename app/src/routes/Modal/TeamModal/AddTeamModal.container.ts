import { AppState } from '../../../store/rootReducer';
import { ModalTypes } from '../../../store/modal/modal.types';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import { closeModal, openModal } from '../../../store/modal/modal.actions';
import { connect } from 'react-redux';
import { saveTeamRequested } from '../../../store/team/team.actions';
import AddTeamModal from './AddTeamModal';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.team.addTeam.isLoading;
  return {
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      onConfirm: saveTeamRequested,
      closeModal: () => closeModal(ModalTypes.addTeam),
      openPickPokemonModal: () => openModal(ModalTypes.roster),
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTeamModal);

export type AddTeamModalContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
