import * as React from 'react';
import { Route } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonListContainer';
import PokemonSingleView from './PokemonSingleView/PokemonSingleViewContainer';

const View = () => {
  return (
    <div>
      <Route path="/pokemon" component={PokemonList} exact />
      <Route path="/pokemon/:id" component={PokemonSingleView} />
      <Route path="/team" exact />
      <Route path="/team/:id" exact />
    </div>
  );
};

export default View;
