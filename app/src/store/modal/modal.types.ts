import { Pokemon } from '../../interfaces/pokemon';

export enum ModalTypes {
  roster,
  addTeam,
  editTeam,
  deleteTeam,
}

export interface ModalState {
  readonly openedModals: ModalTypes[];
  readonly rosterModal: { roster: Pokemon[] };
}

export enum ModalActionTypes {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL',
  SET_ROSTER_MODAL = 'SET_ROSTER_MODAL',
  ADD_TO_ROSTER_MODAL_REQUESTED = 'ADD_TO_ROSTER_MODAL_REQUESTED',
  ADD_TO_ROSTER_MODAL_SUCCEEDED = 'ADD_TO_ROSTER_MODAL_SUCCEEDED',
  REMOVE_FROM_ROSTER_MODAL = 'REMOVE_FROM_ROSTER_MODAL',
}

export interface OpenModalAction {
  type: typeof ModalActionTypes.OPEN_MODAL;
  modalType: ModalTypes;
}

export interface CloseModalAction {
  type: typeof ModalActionTypes.CLOSE_MODAL;
  modalType: ModalTypes;
}

export interface CloseAllModalAction {
  type: typeof ModalActionTypes.CLOSE_ALL_MODAL;
}

export interface SetRosterModalAction {
  type: ModalActionTypes.SET_ROSTER_MODAL;
  roster: Pokemon[];
}

export interface AddToRosterModalRequestedAction {
  type: ModalActionTypes.ADD_TO_ROSTER_MODAL_REQUESTED;
  pokemon: Pokemon;
}

export interface AddToRosterModalSucceededAction {
  type: ModalActionTypes.ADD_TO_ROSTER_MODAL_SUCCEEDED;
  pokemon: Pokemon;
}

export interface RemoveFromRosterModalAction {
  type: ModalActionTypes.REMOVE_FROM_ROSTER_MODAL;
  index: number;
}

export type ModalActions =
  | OpenModalAction
  | CloseModalAction
  | CloseAllModalAction
  | SetRosterModalAction
  | AddToRosterModalRequestedAction
  | AddToRosterModalSucceededAction
  | RemoveFromRosterModalAction;
