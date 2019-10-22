import { ModalActions, ModalActionTypes, ModalState } from './modal.types';
import { Reducer } from 'redux';
import produce from 'immer';

export const INITIAL_STATE: ModalState = {
  openedModals: [],
};

const modalReducer: Reducer<ModalState, ModalActions> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case ModalActionTypes.CLOSE_MODAL:
        draft.openedModals = draft.openedModals.filter(
          modal => modal !== action.modalType,
        );
        break;
      case ModalActionTypes.OPEN_MODAL:
        draft.openedModals.push(action.modalType);
        break;
      case ModalActionTypes.CLOSE_ALL_MODAL:
        draft.openedModals = [];
        break;
    }
  });
};

export default modalReducer;
