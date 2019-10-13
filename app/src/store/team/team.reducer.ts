import produce from 'immer';

import { Reducer } from 'redux';
import { Team } from '../../interfaces/team';
import { TeamActions, TeamActionTypes, TeamState } from './team.types';

const INITIAL_STATE: TeamState = {
  teams: { data: [], isLoading: false },
  current: { team: <Team>{}, isLoading: false },
  addTeam: { isLoading: false },
  editTeam: { isLoading: false },
};

const teamReducer: Reducer<TeamState, TeamActions> = (
  state = INITIAL_STATE,
  action,
) => {
  return produce(state, draft => {
    switch (action.type) {
      case TeamActionTypes.GET_TEAMS_REQUESTED:
        draft.teams.isLoading = true;
        break;
      case TeamActionTypes.GET_TEAMS_SUCCEEDED:
        draft.teams.data = action.data;
        draft.teams.isLoading = false;
        break;
      case TeamActionTypes.GET_TEAMS_FAILED:
        draft.teams.isLoading = false;
        break;
      case TeamActionTypes.GET_TEAM_BY_ID_REQUESTED:
        draft.current.isLoading = true;
        break;
      case TeamActionTypes.GET_TEAM_BY_ID_SUCCEEDED:
        draft.current.team = action.team;
        draft.current.isLoading = false;
        break;
      case TeamActionTypes.GET_TEAM_BY_ID_FAILED:
        draft.current.isLoading = false;
        break;
      case TeamActionTypes.SAVE_TEAM_REQUESTED:
        draft.addTeam.isLoading = true;
        break;
      case TeamActionTypes.SAVE_TEAM_SUCCEEDED:
        draft.addTeam.isLoading = false;
        draft.teams.data.push(action.savedTeam);
        break;
      case TeamActionTypes.SAVE_TEAM_FAILED:
        draft.addTeam.isLoading = false;
        break;
      case TeamActionTypes.DELETE_TEAM_REQUESTED:
        draft.teams.isLoading = true;
        break;
      case TeamActionTypes.DELETE_TEAM_SUCCEEDED:
        draft.teams.isLoading = false;
        draft.teams.data = state.teams.data.filter(
          team => team._id !== action.team._id,
        );
        break;
      case TeamActionTypes.DELETE_TEAM_FAILED:
        draft.teams.isLoading = false;
        break;
      case TeamActionTypes.EDIT_TEAM_REQUESTED:
        draft.editTeam.isLoading = true;
        break;
      case TeamActionTypes.EDIT_TEAM_SUCCEEDED:
        draft.editTeam.isLoading = false;
        draft.current.team = action.team;
        break;
      case TeamActionTypes.EDIT_TEAM_FAILED:
        draft.editTeam.isLoading = false;
        break;
      default:
        break;
    }
  });
};

export default teamReducer;
