import { bindActionCreators, Dispatch } from 'redux';
import PokemonList from './PokemonList';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import { Pokemon } from '../../interfaces/pokemon';

import { getAllPokemonRequested } from '../../store/pokemon/pokemon.actions';

export interface AppStateProps {
  pokemonData: Pokemon[];
  isLoading: boolean;
}

const mapStateToProps = (state: AppState): AppStateProps => {
  const pokemonData = state.pokemon.pokemonData.data;
  const isLoading = state.pokemon.pokemonData.isLoading;
  return {
    pokemonData,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getAllPokemon: getAllPokemonRequested }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonList);
