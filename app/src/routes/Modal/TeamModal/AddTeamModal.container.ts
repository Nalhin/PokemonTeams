import { AppState } from '../../../store/rootReducer';
import { ModalTypes } from '../../../store/modal/modal.types';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import { closeModal, openModal } from '../../../store/modal/modal.actions';
import { connect } from 'react-redux';
import { saveTeamRequested } from '../../../store/team/team.actions';
import AddTeamModal from './AddTeamModal';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.team.newTeam.isLoading;
  const isOpen = state.modal.openModals.some(
    modal => modal === ModalTypes.addTeam,
  );
  return {
    isLoading,
    isOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      onConfirm: saveTeamRequested,
      closeModal: () => closeModal(ModalTypes.addTeam),
      openPickPokemonModal: () => openModal(ModalTypes.pickPokemon),
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
