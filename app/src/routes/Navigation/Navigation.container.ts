import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { connect } from 'react-redux';
import { logoutUserRequested } from '../../store/user/user.actions';
import Navigation from './Navigation';

const mapStateToProps = (state: AppState) => {
  const isAuthenticated = state.user.isAuthenticated;
  return {
    isAuthenticated,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      logoutUser: logoutUserRequested,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Navigation);

export type NavigationContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
