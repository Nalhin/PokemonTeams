import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { registerUserRequested } from '../../store/user/user.actions';
import Register from './Register';
import { AppState } from '../../store/rootReducer';
import { RootAction } from '../../store/rootAction';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.user.isLoading;
  return {
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ registerUser: registerUserRequested }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Register);

export type RegisterContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
