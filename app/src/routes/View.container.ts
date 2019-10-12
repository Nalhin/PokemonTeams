import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../store/rootAction';
import { connect } from 'react-redux';
import View from './View';
import { authorizeUserRequested } from '../store/user/user.actions';

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators({ authorizeUser: authorizeUserRequested }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(View);

export type ViewContainerProps = ReturnType<typeof mapDispatchToProps>;
