import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Navigation from './Navigation/Navigation.container';
import Modal from './Modal/Modal.container';
import Snackbars from './Snackbars/Snackbars.container';
import UnauthorizedRoute from '../components/UnauthorizedRoute/UnauthorizedRoute.container';
import Loading from '../components/Loading/Loading';

const Login = React.lazy(() => import('./Login/Login.container'));
const Register = React.lazy(() => import('./Register/Register.container'));
const PokemonList = React.lazy(() =>
  import('./PokemonList/PokemonList.container'),
);
const PokemonSingleView = React.lazy(() =>
  import('./PokemonSingleView/PokemonSingleView.container'),
);
const Teams = React.lazy(() => import('./Teams/Teams.container'));
const TeamSingleView = React.lazy(() =>
  import('./TeamSingleView/TeamSingleView.container'),
);
const NoMatch = React.lazy(() => import('./NoMatch/NoMatch'));

const View: React.FC = () => {
  return (
    <div>
      <Navigation />
      <React.Suspense fallback={<Loading isLoading />}>
        <Switch>
          <UnauthorizedRoute path="/" component={Login} exact />
          <UnauthorizedRoute path="/register" component={Register} exact />
          <Route path="/pokemon" component={PokemonList} exact />
          <Route path="/pokemon/:id" component={PokemonSingleView} exact />
          <Route path="/teams" component={Teams} exact />
          <Route path="/teams/:id" component={TeamSingleView} exact />
          <Route component={NoMatch} />
        </Switch>
      </React.Suspense>
      <Modal />
      <Snackbars />
    </div>
  );
};

export default View;
