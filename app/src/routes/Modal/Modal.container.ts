import { AppState } from '../../store/rootReducer';
import { bindActionCreators, Dispatch } from 'redux';
import { RootAction } from '../../store/rootAction';

import { closeAllModal } from '../../store/modal/modal.actions';

import { connect } from 'react-redux';
import Modal from './Modal';

const mapStateToProps = (state: AppState) => {
  const openedModals = state.modal.openedModals;
  const isModalOpen = !!state.modal.openedModals.length;
  return {
    isModalOpen,
    openedModals,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) =>
  bindActionCreators(
    {
      closeAllModal,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Modal);

export type ModalContainerProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
