import { bindActionCreators, Dispatch } from 'redux';
import RosterModal from './RosterModal';
import { connect } from 'react-redux';
import { AppState } from '../../../store/rootReducer';
import { getAllPokemonRequested } from '../../../store/pokemon/pokemon.actions';
import { RootAction } from '../../../store/rootAction';
import {
  addToRosterModalRequested,
  closeModal,
  removeFromRosterModal,
  setTeamModalRoster,
} from '../../../store/modal/modal.actions';

const mapStateToProps = (state: AppState) => {
  const pokemonData = state.pokemon.pokemonData.data;
  const isLoading = state.pokemon.pokemonData.isLoading;
  const roster = state.modal.rosterModal.roster;
  return {
    pokemonData,
    isLoading,
    roster,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      getAllPokemon: getAllPokemonRequested,
      closeModal,
      addToRosterModal: addToRosterModalRequested,
      removeFromRosterModal,
      saveRoster: setTeamModalRoster,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RosterModal);

export type RosterModalContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
