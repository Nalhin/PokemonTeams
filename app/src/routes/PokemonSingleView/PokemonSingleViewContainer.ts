import { bindActionCreators, Dispatch } from 'redux';

import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import { Pokemon } from '../../interfaces/pokemon';
import { getPokemonByIdRequested } from '../../store/pokemon/pokemon.actions';
import PokemonSingleView from './PokemonSingleView';

export interface AppStateProps {
  pokemon: Pokemon;
  isLoading: boolean;
}

function mapStateToDispatch(state: AppState): AppStateProps {
  const pokemon = state.pokemon.current.data;
  console.log(pokemon);
  const isLoading = state.pokemon.current.isLoading;
  return {
    pokemon,
    isLoading,
  };
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ getPokemonById: getPokemonByIdRequested }, dispatch);

export default connect(
  mapStateToDispatch,
  mapDispatchToProps,
)(PokemonSingleView);
