import { SagaIterator } from 'redux-saga';
import { all, put, select, takeEvery } from 'redux-saga/effects';
import {
  AddToRosterModalRequestedAction,
  ModalActionTypes,
} from './modal.types';
import { addToRosterModalSucceeded } from './modal.actions';
import { generateSnackbar } from '../../utils/generateSnackbar';
import { SnackbarTypes } from '../../interfaces/snackbar';
import { addSnackbar } from '../snackbar/sanckbar.action';

export function* modalRootSaga(): SagaIterator {
  yield all([
    yield takeEvery(
      ModalActionTypes.ADD_TO_ROSTER_MODAL_REQUESTED,
      addToRosterModalSaga,
    ),
  ]);
}

export function* addToRosterModalSaga(
  action: AddToRosterModalRequestedAction,
): SagaIterator {
  const roster = yield select(state => state.modal.rosterModal.roster);
  const isRosterFull = roster.length < 5;
  if (isRosterFull) yield put(addToRosterModalSucceeded(action.pokemon));
  else
    yield put(
      addSnackbar(generateSnackbar('Roster is full.', SnackbarTypes.warning)),
    );
}
