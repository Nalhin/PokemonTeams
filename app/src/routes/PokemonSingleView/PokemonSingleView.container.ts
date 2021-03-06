import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import { getPokemonByIdRequested } from '../../store/pokemon/pokemon.actions';
import PokemonSingleView from './PokemonSingleView';
import { RootAction } from '../../store/rootAction';

const mapStateToProps = (state: AppState) => {
  const pokemon = state.pokemon.current.data;
  const isLoading = state.pokemon.current.isLoading;
  return {
    pokemon,
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ getPokemonById: getPokemonByIdRequested }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonSingleView);

export type PokemonSingleViewContainerProps = ReturnType<
  typeof mapStateToProps
> &
  ReturnType<typeof mapDispatchToProps>;
