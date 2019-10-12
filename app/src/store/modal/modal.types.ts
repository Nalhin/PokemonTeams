export enum ModalTypes {
  pickPokemon,
  addTeam,
  editTeam,
}

export interface ModalState {
  readonly openModals: ModalTypes[];
}

export enum ModalActionTypes {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
}

export interface OpenModalAction {
  type: typeof ModalActionTypes.OPEN_MODAL;
  modalType: ModalTypes;
}

export interface CloseModalAction {
  type: typeof ModalActionTypes.CLOSE_MODAL;
  modalType: ModalTypes;
}

export type ModalActions = OpenModalAction | CloseModalAction;
