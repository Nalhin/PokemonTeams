import { SagaIterator } from 'redux-saga';
import { call, put, all, takeEvery } from '@redux-saga/core/effects';
import {
  DeleteTeamRequestedAction,
  GetTeamByIdRequestedAction,
  GetTeamsRequestedAction,
  SaveTeamRequestedAction,
  TeamActionTypes,
} from './team.types';
import {
  fetchDeleteTeam,
  fetchGetTeamById,
  fetchGetTeams,
  fetchSaveTeam,
} from './team.api.js';
import {
  deleteTeamFailed,
  deleteTeamSucceeded,
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

export function* saveTeamSaga(action: SaveTeamRequestedAction): SagaIterator {
  try {
    const team = yield call(fetchSaveTeam, action.team);
    yield put(saveTeamSucceeded(team));
  } catch (e) {
    yield put(saveTeamFailed());
  }
}
