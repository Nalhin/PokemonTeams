import {
  AddToRosterModalRequestedAction,
  AddToRosterModalSucceededAction,
  CloseAllModalAction,
  CloseModalAction,
  ModalActionTypes,
  ModalTypes,
  OpenModalAction,
  RemoveFromRosterModalAction,
  SetRosterModalAction,
  SetTeamModalAction,
  SetTeamModalRosterAction,
  TeamCombined,
} from './modal.types';
import { Pokemon } from '../../interfaces/pokemon';

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

export const setRosterModal = (roster: Pokemon[]): SetRosterModalAction => ({
  type: ModalActionTypes.SET_ROSTER_MODAL,
  roster,
});

export const addToRosterModalRequested = (
  pokemon: Pokemon,
): AddToRosterModalRequestedAction => ({
  type: ModalActionTypes.ADD_TO_ROSTER_MODAL_REQUESTED,
  pokemon,
});

export const addToRosterModalSucceeded = (
  pokemon: Pokemon,
): AddToRosterModalSucceededAction => ({
  type: ModalActionTypes.ADD_TO_ROSTER_MODAL_SUCCEEDED,
  pokemon,
});

export const removeFromRosterModal = (
  index: number,
): RemoveFromRosterModalAction => ({
  type: ModalActionTypes.REMOVE_FROM_ROSTER_MODAL,
  index,
});

export const setTeamModal = (team: TeamCombined): SetTeamModalAction => ({
  type: ModalActionTypes.SET_TEAM_MODAL,
  team,
});

export const setTeamModalRoster = (
  roster: Pokemon[],
): SetTeamModalRosterAction => ({
  type: ModalActionTypes.SET_TEAM_MODAL_ROSTER,
  roster,
});
