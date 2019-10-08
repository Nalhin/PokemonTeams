import { Team } from '../../interfaces/team';

export interface TeamState {
  readonly teams: { data: Team[]; isLoading: boolean };
}

export enum TeamActionTypes {
  GET_TEAMS_REQUESTED = 'GET_TEAMS_REQUESTED',
  GET_TEAMS_SUCCEEDED = 'GET_TEAMS_SUCCEEDED',
  GET_TEAMS_FAILED = 'GET_TEAMS_FAILED',
  GET_TEAM_BY_ID_REQUESTED = 'GET_TEAM_BY_ID_REQUESTED',
  GET_TEAM_BY_ID_SUCCEEDED = 'GET_TEAM_BY_ID_SUCCEEDED',
  GET_TEAM_BY_ID_FAILED = 'GET_TEAM_BY_ID_FAILED',
  SAVE_TEAM_REQUESTED = 'SAVE_TEAM_REQUESTED',
  SAVE_TEAM_SUCCEEDED = ' SAVE_TEAM_SUCCEEDED ',
  SAVE_TEAM_FAILED = 'SAVE_TEAM_FAILED',
  DELETE_TEAM_REQUESTED = 'DELETE_TEAM_REQUESTED',
  DELETE_TEAM_SUCCEEDED = 'DELETE_TEAM_SUCCEEDED',
  DELETE_TEAM_FAILED = 'DELETE_TEAM_FAILED',
}

export interface GetTeamsRequestedAction {
  type: TeamActionTypes.GET_TEAMS_REQUESTED;
}
export interface GetTeamsSucceededAction {
  type: TeamActionTypes.GET_TEAMS_SUCCEEDED;
  data: Team[];
}
export interface GetTeamsFailedAction {
  type: TeamActionTypes.GET_TEAMS_FAILED;
}
export interface GetTeamByIdRequestedAction {
  type: TeamActionTypes.GET_TEAM_BY_ID_REQUESTED;
  _id: string;
}
export interface GetTeamByIdSucceededAction {
  type: TeamActionTypes.GET_TEAM_BY_ID_SUCCEEDED;
  team: Team;
}
export interface GetTeamByIdFailedAction {
  type: TeamActionTypes.GET_TEAM_BY_ID_FAILED;
}
export interface SaveTeamRequestedAction {
  type: TeamActionTypes.SAVE_TEAM_REQUESTED;
  team: Team;
}
export interface SaveTeamSucceededAction {
  type: TeamActionTypes.SAVE_TEAM_SUCCEEDED;
  team: Team;
}
export interface SaveTeamFailedAction {
  type: TeamActionTypes.SAVE_TEAM_FAILED;
}
export interface DeleteTeamRequestedAction {
  type: TeamActionTypes.DELETE_TEAM_REQUESTED;
  _id: string;
}
export interface DeleteTeamSucceededAction {
  type: TeamActionTypes.DELETE_TEAM_SUCCEEDED;
  team: Team;
}
export interface DeleteTeamFailedAction {
  type: TeamActionTypes.DELETE_TEAM_FAILED;
}

export type TeamActions =
  | GetTeamsRequestedAction
  | GetTeamsSucceededAction
  | GetTeamsFailedAction
  | GetTeamByIdRequestedAction
  | GetTeamByIdSucceededAction
  | GetTeamByIdFailedAction
  | SaveTeamRequestedAction
  | SaveTeamSucceededAction
  | SaveTeamFailedAction
  | DeleteTeamRequestedAction
  | DeleteTeamSucceededAction
  | DeleteTeamFailedAction;
