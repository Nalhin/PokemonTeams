import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../../store/rootAction';
import { closeModal, openModal } from '../../../store/modal/modal.actions';
import { ModalTypes } from '../../../store/modal/modal.types';
import { connect } from 'react-redux';
import { editTeamRequested } from '../../../store/team/team.actions';
import { AppState } from '../../../store/rootReducer';
import EditTeamModal from './EditTeamModal';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.pokemon.pokemonData.isLoading;
  const isOpen = state.modal.openModals.some(
    modal => modal === ModalTypes.editTeam,
  );
  return {
    isLoading,
    isOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      onConfirm: editTeamRequested,
      closeModal: () => closeModal(ModalTypes.editTeam),
      openPickPokemonModal: () => openModal(ModalTypes.pickPokemon),
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditTeamModal);

export type EditTeamModalContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
