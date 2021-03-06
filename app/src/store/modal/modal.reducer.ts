import {
  ModalActions,
  ModalActionTypes,
  ModalState,
  TeamCombined,
} from './modal.types';
import { Reducer } from 'redux';
import produce from 'immer';

export const INITIAL_STATE: ModalState = {
  openedModals: [],
  rosterModal: { roster: [] },
  teamModal: { team: {} as TeamCombined },
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
      case ModalActionTypes.SET_ROSTER_MODAL:
        draft.rosterModal.roster = action.roster;
        break;
      case ModalActionTypes.ADD_TO_ROSTER_MODAL_SUCCEEDED:
        draft.rosterModal.roster.push(action.pokemon);
        break;
      case ModalActionTypes.REMOVE_FROM_ROSTER_MODAL:
        draft.rosterModal.roster = draft.rosterModal.roster.filter(
          (pokemon, i) => i !== action.index,
        );
        break;
      case ModalActionTypes.SET_TEAM_MODAL:
        draft.teamModal.team = action.team;
        break;
      case ModalActionTypes.SET_TEAM_MODAL_ROSTER:
        draft.teamModal.team.roster = action.roster;
        break;
      default:
        break;
    }
  });
};

export default modalReducer;
