import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PokemonModelViewer from '../../components/PokemonModelViewer/PokemonModelViewer';
import Loading from '../../components/Loading/Loading';
import { PokemonSingleViewContainerProps } from './PokemonSingleView.container';

interface RouterProps {
  id: string;
}

interface PokemonSingleViewProps
  extends RouteComponentProps<RouterProps>,
    PokemonSingleViewContainerProps {
  pokemon: Pokemon;
}

const PokemonSingleView: React.FC<PokemonSingleViewProps> = ({
  pokemon,
  isLoading,
  getPokemonById,
  match,
}) => {
  React.useEffect(() => {
    getPokemonById(match.params.id);
  }, [getPokemonById]);

  return (
    <Loading isLoading={isLoading} isRelative>
      <div data-testid="pokemon_single_view">
        <div>{pokemon.name}</div>
        <PokemonModelViewer id={match.params.id} />
      </div>
    </Loading>
  );
};

export default withRouter(PokemonSingleView);
