import { SagaIterator } from 'redux-saga';
import { call, put, all, takeEvery } from '@redux-saga/core/effects';
import {
  DeleteTeamRequestedAction,
  EditTeamRequestedAction,
  GetTeamByIdRequestedAction,
  GetTeamsRequestedAction,
  SaveTeamRequestedAction,
  TeamActionTypes,
} from './team.types';
import {
  fetchDeleteTeam,
  fetchEditTeam,
  fetchGetTeamById,
  fetchGetTeams,
  fetchSaveTeam,
} from './team.api.js';
import {
  deleteTeamFailed,
  deleteTeamSucceeded,
  editTeamFailed,
  editTeamSucceeded,
  getTeamByIdFailed,
  getTeamByIdSucceeded,
  getTeamsFailed,
  getTeamsSucceeded,
  saveTeamFailed,
  saveTeamSucceeded,
} from './team.actions';

export function* teamRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(TeamActionTypes.GET_TEAMS_REQUESTED, getTeamsSaga),
    yield takeEvery(TeamActionTypes.GET_TEAM_BY_ID_REQUESTED, getTeamByIdSaga),
    yield takeEvery(TeamActionTypes.DELETE_TEAM_REQUESTED, deleteTeamSaga),
    yield takeEvery(TeamActionTypes.SAVE_TEAM_REQUESTED, saveTeamSaga),
    yield takeEvery(TeamActionTypes.EDIT_TEAM_REQUESTED, editTeamSaga),
  ]);
}

export function* getTeamsSaga(action: GetTeamsRequestedAction): SagaIterator {
  try {
    const data = yield call(fetchGetTeams);
    yield put(getTeamsSucceeded(data));
  } catch (e) {
    yield put(getTeamsFailed());
  }
}

export function* getTeamByIdSaga(
  action: GetTeamByIdRequestedAction,
): SagaIterator {
  try {
    const team = yield call(fetchGetTeamById, action._id);
    yield put(getTeamByIdSucceeded(team));
  } catch (e) {
    yield put(getTeamByIdFailed());
  }
}

export function* deleteTeamSaga(
  action: DeleteTeamRequestedAction,
): SagaIterator {
  try {
    const team = yield call(fetchDeleteTeam, action._id);
    yield put(deleteTeamSucceeded(team));
  } catch (e) {
    yield put(deleteTeamFailed());
  }
}

export function* editTeamSaga(action: EditTeamRequestedAction): SagaIterator {
  try {
    const team = yield call(fetchEditTeam, action.team);
    console.log(team);
    yield put(editTeamSucceeded(team));
  } catch (e) {
    yield put(editTeamFailed());
  }
}

export function* saveTeamSaga(action: SaveTeamRequestedAction): SagaIterator {
  try {
    const team = yield call(fetchSaveTeam, action.team);
    yield put(saveTeamSucceeded(team));
  } catch (e) {
    yield put(saveTeamFailed());
  }
}
