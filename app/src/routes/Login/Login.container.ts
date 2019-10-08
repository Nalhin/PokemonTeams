import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { loginUserRequested } from '../../store/user/user.actions';
import Login from './Login';
import { AppState } from '../../store/rootReducer';
import { RootAction } from '../../store/rootAction';

const mapStateToProps = (state: AppState) => {
  const isLoading = state.user.isLoading;
  return {
    isLoading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ loginUser: loginUserRequested }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export type LoginContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
