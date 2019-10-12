import { ModalActions, ModalActionTypes, ModalState } from './modal.types';
import { Reducer } from 'redux';
import produce from 'immer';

const INITIAL_STATE: ModalState = {
  openModals: [],
};

const modalReducer: Reducer<ModalState, ModalActions> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ModalActionTypes.CLOSE_MODAL:
        draft.openModals = draft.openModals.filter(
          modal => modal !== action.modalType,
        );
        break;
      case ModalActionTypes.OPEN_MODAL:
        draft.openModals.push(action.modalType);
        break;
      case ModalActionTypes.CLOSE_ALL_MODAL:
        draft.openModals = [];
        break;
    }
  });
};

export default modalReducer;
