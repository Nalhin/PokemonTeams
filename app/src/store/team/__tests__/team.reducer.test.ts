import teamReducer, { INITIAL_STATE } from '../team.reducer';
import {
  deleteTeamFailed,
  deleteTeamRequested,
  deleteTeamSucceeded,
  editTeamFailed,
  editTeamRequested,
  editTeamSucceeded,
  getTeamByIdFailed,
  getTeamByIdRequested,
  getTeamByIdSucceeded,
  getTeamsFailed,
  getTeamsRequested,
  getTeamsSucceeded,
  saveTeamFailed,
  saveTeamRequested,
  saveTeamSucceeded,
} from '../team.actions';
import { TeamState } from '../team.types';
import { fakeTeam } from '../../../../test/fixtures/team';
import { createMemoryHistory } from 'history';

describe('Team Reducer', () => {
  it('Should return the initial state', () => {
    const expectedState = INITIAL_STATE;

    const reducer = teamReducer(undefined, getTeamsFailed());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_TEAMS_REQUESTED action', () => {
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      teams: { ...INITIAL_STATE.teams, isLoading: true },
    };

    const reducer = teamReducer(INITIAL_STATE, getTeamsRequested());

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_TEAMS_SUCCEEDED action', () => {
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      teams: { data: [fakeTeam], isLoading: false },
    };
    const action = getTeamsSucceeded([fakeTeam]);

    const reducer = teamReducer(INITIAL_STATE, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_TEAMS_FAILED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      teams: { ...INITIAL_STATE.teams, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
    };
    const action = getTeamsFailed();

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_TEAM_BY_ID_REQUESTED action', () => {
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const action = getTeamByIdRequested(fakeTeam._id);

    const reducer = teamReducer(INITIAL_STATE, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_TEAM_BY_ID_SUCCEEDED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      current: { team: fakeTeam, isLoading: false },
    };
    const action = getTeamByIdSucceeded(fakeTeam);

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle GET_TEAM_BY_ID_FAILED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
    };
    const action = getTeamByIdFailed();

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle SAVE_TEAM_REQUESTED action', () => {
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      addTeam: { ...INITIAL_STATE.addTeam, isLoading: true },
    };
    const action = saveTeamRequested(fakeTeam);

    const reducer = teamReducer(INITIAL_STATE, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle SAVE_TEAM_SUCCEEDED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      addTeam: { ...INITIAL_STATE.addTeam, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      teams: {
        ...INITIAL_STATE.teams,
        data: [...INITIAL_STATE.teams.data, fakeTeam],
      },
    };
    const action = saveTeamSucceeded(fakeTeam);

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle SAVE_TEAM_FAILED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      addTeam: { ...INITIAL_STATE.addTeam, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      addTeam: { ...INITIAL_STATE.addTeam, isLoading: false },
    };
    const action = saveTeamFailed();

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle DELETE_TEAM_REQUESTED action', () => {
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const action = deleteTeamRequested(fakeTeam._id, createMemoryHistory());

    const reducer = teamReducer(INITIAL_STATE, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle DELETE_TEAM_SUCCEEDED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      teams: { ...INITIAL_STATE.teams, data: [fakeTeam] },
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: false },
    };
    const action = deleteTeamSucceeded(fakeTeam);

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle DELETE_TEAM_FAILED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
    };
    const action = deleteTeamFailed();

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle EDIT_TEAM_REQUESTED action', () => {
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      editTeam: { ...INITIAL_STATE.editTeam, isLoading: true },
    };
    const action = editTeamRequested(fakeTeam);

    const reducer = teamReducer(INITIAL_STATE, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle EDIT_TEAM_SUCCEEDED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      editTeam: { ...INITIAL_STATE.editTeam, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
      current: { ...INITIAL_STATE.current, team: fakeTeam },
    };
    const action = editTeamSucceeded(fakeTeam);

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle EDIT_TEAM_FAILED action', () => {
    const initialState: TeamState = {
      ...INITIAL_STATE,
      editTeam: { ...INITIAL_STATE.editTeam, isLoading: true },
    };
    const expectedState: TeamState = {
      ...INITIAL_STATE,
    };
    const action = editTeamFailed();

    const reducer = teamReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
