import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonListContainer';
import PokemonSingleView from './PokemonSingleView/PokemonSingleViewContainer';
import NoMatch from './NoMatch/NoMatch';
import Teams from './Teams/Teams';
import TeamSingleView from './TeamSingleView/TeamSingleView';

const View = () => {
  return (
    <div>
      <Switch>
        <Route path="/pokemon" component={PokemonList} exact />
        <Route path="/pokemon/:id" component={PokemonSingleView} exact />
        <Route path="/team" component={Teams} exact />
        <Route path="/team/:id" component={TeamSingleView} exact />
        <Route component={NoMatch} />
      </Switch>
    </div>
  );
};

export default View;
