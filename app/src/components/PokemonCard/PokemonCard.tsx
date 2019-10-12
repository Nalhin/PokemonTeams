import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Pokemon } from '../../interfaces/pokemon';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import styled from '@emotion/styled';
import { PADDING } from '../../styles/padding';
import Tag from '../Tag/Tag';

const StyledCard = styled(Card)`
  max-width: 160px;
  margin: ${PADDING.BASE} auto;
`;

const StyledCardMedia = styled(CardMedia)`
  height: 125px;
  width: 148px;
`;

const StyledTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
        <StyledCardMedia image={`/icons/${pokemon.pokedexId}.png`} />
        <CardContent>
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
        </CardContent>
      </CardActionArea>
    </StyledCard>
  );
};

export default withRouter(PokemonCard);
