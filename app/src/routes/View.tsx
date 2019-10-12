import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonList.container';
import PokemonSingleView from './PokemonSingleView/PokemonSingleView.container';
import NoMatch from './NoMatch/NoMatch';
import Teams from './Teams/Teams.container';
import TeamSingleView from './TeamSingleView/TeamSingleView.container';
import Navigation from './Navigation/Navigation';
import Login from './Login/Login.container';
import Register from './Register/Register.container';
import EditTeam from './EditTeam/EditTeam';
import Modal from './Modal/Modal.container';

const View: React.FC = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path="/pokemon" component={PokemonList} exact />
        <Route path="/pokemon/:id" component={PokemonSingleView} exact />
        <Route path="/teams" component={Teams} exact />
        <Route path="/teams/edit/:id" component={EditTeam} exact />
        <Route path="/teams/:id" component={TeamSingleView} exact />
        <Route path="/login" component={Login} exact />
        <Route path="/register" component={Register} exact />
        <Route component={NoMatch} />
      </Switch>
      <Modal />
    </div>
  );
};

export default View;
