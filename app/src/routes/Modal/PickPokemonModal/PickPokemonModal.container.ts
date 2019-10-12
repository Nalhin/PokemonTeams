import { bindActionCreators, Dispatch } from 'redux';
import PickPokemonModal from './PickPokemonModal';
import { connect } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { getAllPokemonRequested } from '../../../store/pokemon/pokemon.actions';
import { RootAction } from '../../../store/rootAction';
import { ModalTypes } from '../../../store/modal/modal.types';
import { closeModal } from '../../../store/modal/modal.actions';

const mapStateToProps = (state: AppState) => {
  const pokemonData = state.pokemon.pokemonData.data;
  const isLoading = state.pokemon.pokemonData.isLoading;
  const isOpen = state.modal.openModals.some(
    modal => modal === ModalTypes.pickPokemon,
  );
  return {
    pokemonData,
    isLoading,
    isOpen,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      getAllPokemon: getAllPokemonRequested,
      closeModal: () => closeModal(ModalTypes.pickPokemon),
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PickPokemonModal);

export type PickPokemonModalContainerProps = ReturnType<
  typeof mapStateToProps
> &
  ReturnType<typeof mapDispatchToProps>;
