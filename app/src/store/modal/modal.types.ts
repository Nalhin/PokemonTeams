import { Pokemon } from '../../interfaces/pokemon';
import { NewTeam } from '../../interfaces/newTeam';
import { Team } from '../../interfaces/team';

export enum ModalTypes {
  roster,
  addTeam,
  editTeam,
  deleteTeam,
}

export type TeamCombined = NewTeam | Team;

export interface ModalState {
  readonly openedModals: ModalTypes[];
  readonly rosterModal: { roster: Pokemon[] };
  readonly teamModal: { team: TeamCombined };
}

export enum ModalActionTypes {
  OPEN_MODAL = 'OPEN_MODAL',
  CLOSE_MODAL = 'CLOSE_MODAL',
  CLOSE_ALL_MODAL = 'CLOSE_ALL_MODAL',
  SET_ROSTER_MODAL = 'SET_ROSTER_MODAL',
  ADD_TO_ROSTER_MODAL_REQUESTED = 'ADD_TO_ROSTER_MODAL_REQUESTED',
  ADD_TO_ROSTER_MODAL_SUCCEEDED = 'ADD_TO_ROSTER_MODAL_SUCCEEDED',
  REMOVE_FROM_ROSTER_MODAL = 'REMOVE_FROM_ROSTER_MODAL',
  SET_TEAM_MODAL = 'SET_TEAM_MODAL',
  SET_TEAM_MODAL_ROSTER = 'SET_TEAM_MODAL_ROSTER',
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

export interface SetTeamModalAction {
  type: ModalActionTypes.SET_TEAM_MODAL;
  team: TeamCombined;
}

export interface SetTeamModalRosterAction {
  type: ModalActionTypes.SET_TEAM_MODAL_ROSTER;
  roster: Pokemon[];
}
export type ModalActions =
  | OpenModalAction
  | CloseModalAction
  | CloseAllModalAction
  | SetRosterModalAction
  | AddToRosterModalRequestedAction
  | AddToRosterModalSucceededAction
  | RemoveFromRosterModalAction
  | SetTeamModalAction
  | SetTeamModalRosterAction;
