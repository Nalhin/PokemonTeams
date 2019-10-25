import { SagaIterator } from 'redux-saga';
import { all, call, put, takeEvery } from '@redux-saga/core/effects';
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
import { closeModal } from '../modal/modal.actions';
import { ModalTypes } from '../modal/modal.types';
import { generateErrorMessage } from '../../utils/generateErrorMessage';
import { addSnackbar } from '../snackbar/sanckbar.action';
import { generateSnackbar } from '../../utils/generateSnackbar';
import { SnackbarTypes } from '../../interfaces/snackbar';
import { hasEmptyFields } from '../../utils/hasEmptyField';
import { Team } from '../../interfaces/team';
import { NewTeam } from '../../interfaces/newTeam';

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
    const response = yield call(fetchGetTeams);
    yield put(getTeamsSucceeded(response.data));
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(getTeamsFailed());
  }
}

export function* getTeamByIdSaga(
  action: GetTeamByIdRequestedAction,
): SagaIterator {
  try {
    const response = yield call(fetchGetTeamById, action._id);
    yield put(getTeamByIdSucceeded(response.data));
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(getTeamByIdFailed());
  }
}

export function* deleteTeamSaga(
  action: DeleteTeamRequestedAction,
): SagaIterator {
  try {
    const response = yield call(fetchDeleteTeam, action._id);
    yield put(deleteTeamSucceeded(response.data));
    yield put(
      addSnackbar(
        generateSnackbar(
          `Removed ${response.data.name}`,
          SnackbarTypes.warning,
        ),
      ),
    );
    action.history.push('/teams');
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(deleteTeamFailed());
  }
}

export function* editTeamSaga(action: EditTeamRequestedAction): SagaIterator {
  try {
    if (hasEmptyFields<Team>(action.team))
      throw new Error('Team has empty fields.');
    const response = yield call(fetchEditTeam, action.team);
    yield put(editTeamSucceeded(response.data));
    yield put(closeModal(ModalTypes.editTeam));
    yield put(
      addSnackbar(
        generateSnackbar(`Edited ${response.data.name}`, SnackbarTypes.success),
      ),
    );
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(editTeamFailed());
  }
}

export function* saveTeamSaga(action: SaveTeamRequestedAction): SagaIterator {
  try {
    if (hasEmptyFields<NewTeam>(action.team))
      throw new Error('Team has empty fields.');
    const response = yield call(fetchSaveTeam, action.team);
    yield put(saveTeamSucceeded(response.data));
    yield put(
      addSnackbar(
        generateSnackbar(`Added ${response.data.name}`, SnackbarTypes.success),
      ),
    );
  } catch (e) {
    const errorMessage = generateErrorMessage(e);
    yield put(addSnackbar(generateSnackbar(errorMessage, SnackbarTypes.error)));
    yield put(saveTeamFailed());
  }
}
