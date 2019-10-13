import { AppState } from '../../store/rootReducer';
import { connect } from 'react-redux';
import Snackbars from './Snackbars';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';
import { removeSnackbar } from '../../store/snackbar/sanckbar.action';

const mapStateToProps = (state: AppState) => {
  const snackbarData = state.snackbar.snackbarData;
  return {
    snackbarData,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      removeSnackbar,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Snackbars);

export type SnackbarsContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
