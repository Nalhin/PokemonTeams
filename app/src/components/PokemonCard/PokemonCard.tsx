import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Pokemon } from '../../interfaces/pokemon';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import Tag from '../Tag/Tag';
import { POKEMON_MAX_WIDTH } from '../../styles/sizes';

const StyledCard = styled(Card)`
  max-width: ${POKEMON_MAX_WIDTH};
  margin: 0 auto;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 125px;
  width: ${POKEMON_MAX_WIDTH};
`;

const StyledTagContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledCardContent = styled(CardContent)`
  padding: ${PADDING.X_BASE};
`;

interface PokemonCardProps extends RouteComponentProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, history }) => {
  const redirectToPokemon = (): void => {
    history.push(`/pokemon/${pokemon.pokedexId}`);
  };

  return (
    <StyledCard onClick={redirectToPokemon}>
      <CardActionArea>
        <StyledCardMedia image={`/assets/images/${pokemon.pokedexId}.png`} />
        <StyledCardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            #{pokemon.pokedexId}
          </Typography>
          <Typography variant="h5" component="h2">
            {pokemon.name}
          </Typography>
          <StyledTagContainer>
            {pokemon.tags.map(tag => (
              <Tag tag={tag} key={tag} />
            ))}
          </StyledTagContainer>
        </StyledCardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default withRouter(PokemonCard);
