import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import PokemonList from './PokemonList/PokemonList.container';
import PokemonSingleView from './PokemonSingleView/PokemonSingleView.container';
import NoMatch from './NoMatch/NoMatch';
import Teams from './Teams/Teams.container';
import TeamSingleView from './TeamSingleView/TeamSingleView.container';
import Navigation from './Navigation/Navigation.container';
import Login from './Login/Login.container';
import Register from './Register/Register.container';
import Modal from './Modal/Modal.container';
import Snackbars from './Snackbars/Snackbars.container';
import UnauthorizedRoute from '../components/UnauthorizedRoute/UnauthorizedRoute.container';

const View: React.FC = () => {
  return (
    <div>
      <Navigation />
      <Switch>
        <UnauthorizedRoute path="/" component={Login} exact />
        <UnauthorizedRoute path="/register" component={Register} exact />
        <Route path="/pokemon" component={PokemonList} exact />
        <Route path="/pokemon/:id" component={PokemonSingleView} exact />
        <Route path="/teams" component={Teams} exact />
        <Route path="/teams/:id" component={TeamSingleView} exact />
        <Route component={NoMatch} />
      </Switch>
      <Modal />
      <Snackbars />
    </div>
  );
};

export default View;
