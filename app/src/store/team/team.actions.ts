import {
  DeleteTeamFailedAction,
  DeleteTeamRequestedAction,
  DeleteTeamSucceededAction,
  EditTeamFailedAction,
  EditTeamRequestedAction,
  EditTeamSucceededAction,
  GetTeamByIdFailedAction,
  GetTeamByIdRequestedAction,
  GetTeamByIdSucceededAction,
  GetTeamsFailedAction,
  GetTeamsRequestedAction,
  GetTeamsSucceededAction,
  RemoveDraftAction,
  SaveTeamFailedAction,
  SaveTeamRequestedAction,
  SaveTeamSucceededAction,
  SetDraftAction,
  TeamActionTypes,
} from './team.types';
import { Team } from '../../interfaces/team';
import { NewTeam } from '../../interfaces/newTeam';

export const getTeamsRequested = (): GetTeamsRequestedAction => ({
  type: TeamActionTypes.GET_TEAMS_REQUESTED,
});

export const getTeamsSucceeded = (data: Team[]): GetTeamsSucceededAction => ({
  type: TeamActionTypes.GET_TEAMS_SUCCEEDED,
  data,
});

export const getTeamsFailed = (): GetTeamsFailedAction => ({
  type: TeamActionTypes.GET_TEAMS_FAILED,
});

export const getTeamByIdRequested = (
  _id: string,
): GetTeamByIdRequestedAction => ({
  type: TeamActionTypes.GET_TEAM_BY_ID_REQUESTED,
  _id,
});

export const getTeamByIdSucceeded = (
  team: Team,
): GetTeamByIdSucceededAction => ({
  type: TeamActionTypes.GET_TEAM_BY_ID_SUCCEEDED,
  team,
});

export const getTeamByIdFailed = (): GetTeamByIdFailedAction => ({
  type: TeamActionTypes.GET_TEAM_BY_ID_FAILED,
});

export const saveTeamRequested = (team: NewTeam): SaveTeamRequestedAction => ({
  type: TeamActionTypes.SAVE_TEAM_REQUESTED,
  team,
});

export const saveTeamSucceeded = (
  savedTeam: Team,
): SaveTeamSucceededAction => ({
  type: TeamActionTypes.SAVE_TEAM_SUCCEEDED,
  savedTeam,
});

export const saveTeamFailed = (): SaveTeamFailedAction => ({
  type: TeamActionTypes.SAVE_TEAM_FAILED,
});

export const deleteTeamRequested = (
  _id: string,
): DeleteTeamRequestedAction => ({
  type: TeamActionTypes.DELETE_TEAM_REQUESTED,
  _id,
});

export const deleteTeamSucceeded = (team: Team): DeleteTeamSucceededAction => ({
  type: TeamActionTypes.DELETE_TEAM_SUCCEEDED,
  team,
});

export const deleteTeamFailed = (): DeleteTeamFailedAction => ({
  type: TeamActionTypes.DELETE_TEAM_FAILED,
});

export const editTeamRequested = (team: Team): EditTeamRequestedAction => ({
  type: TeamActionTypes.EDIT_TEAM_REQUESTED,
  team,
});

export const editTeamSucceeded = (team: Team): EditTeamSucceededAction => ({
  type: TeamActionTypes.EDIT_TEAM_SUCCEEDED,
  team,
});

export const editTeamFailed = (): EditTeamFailedAction => ({
  type: TeamActionTypes.EDIT_TEAM_FAILED,
});

export const setDraft = (team: Team): SetDraftAction => ({
  type: TeamActionTypes.SET_DRAFT,
  team,
});

export const removeDraft = (): RemoveDraftAction => ({
  type: TeamActionTypes.REMOVE_DRAFT,
});
