import { bindActionCreators, Dispatch } from 'redux';
import PokemonList from './PokemonList';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import {
  getAllPokemonRequested,
  loadMorePokemon,
} from '../../store/pokemon/pokemon.actions';
import { RootAction } from '../../store/rootAction';

const mapStateToProps = (state: AppState) => {
  const pokemonData = state.pokemon.pokemonData.data;
  const isLoading = state.pokemon.pokemonData.isLoading;
  const loaded = state.pokemon.pokemonData.loaded;
  return {
    pokemonData,
    isLoading,
    loaded,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      getAllPokemon: getAllPokemonRequested,
      loadMorePokemon,
    },
    dispatch,
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PokemonList);

export type PokemonListContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
