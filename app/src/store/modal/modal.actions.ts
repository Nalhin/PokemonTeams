import {
  CloseAllModalAction,
  CloseModalAction,
  ModalActionTypes,
  ModalTypes,
  OpenModalAction,
} from './modal.types';

export const openModal = (modalType: ModalTypes): OpenModalAction => ({
  type: ModalActionTypes.OPEN_MODAL,
  modalType,
});

export const closeModal = (modalType: ModalTypes): CloseModalAction => ({
  type: ModalActionTypes.CLOSE_MODAL,
  modalType,
});

export const closeAllModal = (): CloseAllModalAction => ({
  type: ModalActionTypes.CLOSE_ALL_MODAL,
});
