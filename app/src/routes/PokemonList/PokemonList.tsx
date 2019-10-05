import * as React from 'react';
import { Pokemon } from '../../interfaces/pokemon';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';

interface PokemonListProps extends RouteComponentProps {
  pokemonData: Pokemon[];
  isLoading: boolean;
  getAllPokemon(): void;
}

const PokemonList: React.FC<PokemonListProps> = ({
  pokemonData,
  isLoading,
  getAllPokemon,
  history,
}) => {
  React.useEffect(() => {
    getAllPokemon();
  }, [getAllPokemon]);

  const redirectToPokemon = (id: string): void => {
    history.push(`pokemon/${id}`);
  };

  return (
    <Loading isLoading={isLoading}>
      <div>
        {pokemonData.map(pokemon => (
          <div onClick={() => redirectToPokemon(pokemon.id)} key={pokemon.name}>
            {pokemon.name}
          </div>
        ))}
      </div>
    </Loading>
  );
};

export default withRouter(PokemonList);
