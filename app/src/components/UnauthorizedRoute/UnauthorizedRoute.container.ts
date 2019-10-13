import { AppState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import UnauthorizedRoute from './UnauthorizedRoute';

const mapStateToProps = (state: AppState) => {
  const isAuthenticated = state.user.isAuthenticated;
  return {
    isAuthenticated,
  };
};

export default connect(mapStateToProps)(UnauthorizedRoute);

export type UnauthorizedRouteContainerProps = ReturnType<
  typeof mapStateToProps
>;
