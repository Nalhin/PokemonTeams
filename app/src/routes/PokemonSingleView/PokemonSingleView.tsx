import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import { PokemonSingleViewContainerProps } from './PokemonSingleView.container';
import Paper from '@material-ui/core/Paper';
import styled from '@emotion/styled';
import Typography from '@material-ui/core/Typography';
import { PADDING } from '../../styles/padding';
import Tag from '../../components/Tag/Tag';
import PokemonStats from '../../components/PokemonStats/PokemonStats';
import PokemonModelViewer from '../../components/PokemonModelViewer/PokemonModelViewer';

const StyledTagContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTag = styled(Tag)`
  margin-right: ${PADDING.LARGE};
  padding: ${PADDING.SMALL} ${PADDING.BASE};
`;

const StyledPaper = styled(Paper)`
  width: 90%;
  margin: ${PADDING.LARGE} auto;
  max-width: 600px;
  padding: ${PADDING.LARGE};
`;

const StyledPokemonDescription = styled.div`
  margin: 0 auto;
  display: flex;
  max-width: 300px;
  flex-direction: column;
`;

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
      <StyledPaper data-testid="pokemon-single-view">
        <StyledPokemonDescription>
          <Typography variant="body2" color="textSecondary" component="p">
            #{pokemon.pokedexId}
          </Typography>
          <Typography variant="h5" component="h2">
            {pokemon.name}
          </Typography>
          <StyledTagContainer>
            {pokemon.tags &&
              pokemon.tags.map(tag => <StyledTag tag={tag} key={tag} />)}
          </StyledTagContainer>
        </StyledPokemonDescription>
        <PokemonModelViewer id={match.params.id} />
        <StyledPokemonDescription>
          <PokemonStats
            hp={pokemon.hp}
            attack={pokemon.attack}
            defense={pokemon.defense}
            spellAttack={pokemon.spellAttack}
            spellDefense={pokemon.spellDefense}
            speed={pokemon.speed}
            total={pokemon.total}
          />
        </StyledPokemonDescription>
      </StyledPaper>
    </Loading>
  );
};

export default withRouter(PokemonSingleView);
