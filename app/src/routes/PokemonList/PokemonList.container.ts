import { bindActionCreators, Dispatch } from 'redux';
import PokemonList from './PokemonList';
import { connect } from 'react-redux';
import { AppState } from '../../store/rootReducer';
import { getAllPokemonRequested } from '../../store/pokemon/pokemon.actions';
import { RootAction } from '../../store/rootAction';
import { setDraft } from '../../store/team/team.actions';

const mapStateToProps = (state: AppState) => {
  const pokemonData = state.pokemon.pokemonData.data;
  const isLoading = state.pokemon.pokemonData.isLoading;
  const draftTeam = state.team.draftTeam.team;
  return {
    pokemonData,
    isLoading,
    draftTeam,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
  return bindActionCreators(
    {
      getAllPokemon: getAllPokemonRequested,
      setDraft,
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
