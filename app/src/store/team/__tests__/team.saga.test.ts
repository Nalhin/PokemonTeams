import { PokemonActions } from '../../pokemon/pokemon.types';
import {
  fakeSnackbarErrorAction,
  generateFakeSnackbarAction,
} from '../../../../test/fixtures/snackbar';
import * as teamApi from '../team.api.js';
import {
  fakeAxiosError,
  fakeAxiosSuccessResponse,
} from '../../../../test/fixtures/axios';
import { fakeTeam } from '../../../../test/fixtures/team';
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
import { runSaga } from 'redux-saga';
import {
  deleteTeamSaga,
  editTeamSaga,
  getTeamByIdSaga,
  getTeamsSaga,
  saveTeamSaga,
} from '../team.saga';
import { createMemoryHistory } from 'history';
import { SnackbarTypes } from '../../../interfaces/snackbar';
import { closeModal } from '../../modal/modal.actions';
import { ModalTypes } from '../../modal/modal.types';

const dispatchedActions: PokemonActions[] = [];
const fakeStore = {
  dispatch: (action: PokemonActions) => dispatchedActions.push(action),
};

const mockId = fakeSnackbarErrorAction.snackbar.id;
jest.mock('lodash/uniqueId', () => () => mockId);

describe('Team Saga', () => {
  beforeEach(() => {
    dispatchedActions.length = 0;
    jest.clearAllMocks();
  });

  it('Should getTeams successfully', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchGetTeams').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
      data: [fakeTeam],
    });
    const expectedDispatchedActions = [getTeamsSucceeded([fakeTeam])];

    await runSaga(fakeStore, getTeamsSaga, getTeamsRequested());

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle getAllTeams errors', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchGetTeams').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      getTeamsFailed(),
    ];

    await runSaga(fakeStore, getTeamsSaga, getTeamsRequested());

    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should getTeamById successfully', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchGetTeamById').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
      data: fakeTeam,
    });
    const expectedDispatchedActions = [getTeamByIdSucceeded(fakeTeam)];

    await runSaga(
      fakeStore,
      getTeamByIdSaga,
      getTeamByIdRequested(fakeTeam._id),
    );

    expect(apiMock).toHaveBeenCalledWith(fakeTeam._id);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle getTeamById errors', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchGetTeamById').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      getTeamByIdFailed(),
    ];

    await runSaga(
      fakeStore,
      getTeamByIdSaga,
      getTeamByIdRequested(fakeTeam._id),
    );

    expect(apiMock).toHaveBeenCalledWith(fakeTeam._id);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should deleteTeam successfully', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchDeleteTeam').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
      data: fakeTeam,
    });
    const expectedDispatchedActions = [
      deleteTeamSucceeded(fakeTeam),
      generateFakeSnackbarAction(
        `Removed ${fakeTeam.name}`,
        SnackbarTypes.warning,
      ),
    ];
    const history = createMemoryHistory({ initialEntries: ['/'] });
    const expectedPathname = '/teams';

    await runSaga(
      fakeStore,
      deleteTeamSaga,
      deleteTeamRequested(fakeTeam._id, history),
    );

    expect(history.location.pathname).toEqual(expectedPathname);
    expect(apiMock).toHaveBeenCalledWith(fakeTeam._id);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle deleteTeam errors', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchDeleteTeam').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      deleteTeamFailed(),
    ];
    const expectedPathname = '/';
    const history = createMemoryHistory({ initialEntries: [expectedPathname] });

    await runSaga(
      fakeStore,
      deleteTeamSaga,
      deleteTeamRequested(fakeTeam._id, createMemoryHistory()),
    );

    expect(history.location.pathname).toEqual(expectedPathname);
    expect(apiMock).toHaveBeenCalledWith(fakeTeam._id);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should editTeam successfully', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchEditTeam').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
      data: fakeTeam,
    });
    const expectedDispatchedActions = [
      editTeamSucceeded(fakeTeam),
      closeModal(ModalTypes.editTeam),
      generateFakeSnackbarAction(
        `Edited ${fakeTeam.name}`,
        SnackbarTypes.success,
      ),
    ];

    await runSaga(fakeStore, editTeamSaga, editTeamRequested(fakeTeam));

    expect(apiMock).toHaveBeenCalledWith(fakeTeam);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle editTeam errors', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchEditTeam').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      editTeamFailed(),
    ];

    await runSaga(fakeStore, editTeamSaga, editTeamRequested(fakeTeam));

    expect(apiMock).toHaveBeenCalledWith(fakeTeam);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should saveTeam successfully', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchSaveTeam').mockResolvedValue({
      ...fakeAxiosSuccessResponse,
      data: fakeTeam,
    });
    const expectedDispatchedActions = [
      saveTeamSucceeded(fakeTeam),
      generateFakeSnackbarAction(
        `Added ${fakeTeam.name}`,
        SnackbarTypes.success,
      ),
    ];

    await runSaga(fakeStore, saveTeamSaga, saveTeamRequested(fakeTeam));

    expect(apiMock).toHaveBeenCalledWith(fakeTeam);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });

  it('Should handle saveTeam errors', async () => {
    const apiMock = jest.spyOn(teamApi, 'fetchSaveTeam').mockRejectedValue({
      ...fakeAxiosError,
    });
    const expectedDispatchedActions = [
      fakeSnackbarErrorAction,
      saveTeamFailed(),
    ];

    await runSaga(fakeStore, saveTeamSaga, saveTeamRequested(fakeTeam));

    expect(apiMock).toHaveBeenCalledWith(fakeTeam);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(dispatchedActions).toEqual(expectedDispatchedActions);
  });
});
