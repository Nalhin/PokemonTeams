import { put } from 'redux-saga/effects';

import {
  addToRosterModalRequested,
  addToRosterModalSucceeded,
} from '../modal.actions';
import { fakePokemon } from '../../../../test/fixtures/pokemon';
import { addToRosterModalSaga } from '../modal.saga';
import { Pokemon } from '../../../interfaces/pokemon';
import {
  fakeSnackbarErrorAction,
  generateFakeSnackbarAction,
} from '../../../../test/fixtures/snackbar';
import { SnackbarTypes } from '../../../interfaces/snackbar';

const mockId = fakeSnackbarErrorAction.snackbar.id;
jest.mock('lodash/uniqueId', () => () => mockId);

describe('Modal Saga', () => {
  it('Should allow to add pokemon', () => {
    const expectedDispatchedActions = put(
      addToRosterModalSucceeded(fakePokemon),
    );
    const action = addToRosterModalRequested(fakePokemon);
    const rosterState: Pokemon[] = [];

    const iterator = addToRosterModalSaga(action);
    iterator.next();

    expect(iterator.next(rosterState).value).toEqual(expectedDispatchedActions);
  });

  it('Should display error if team is full', () => {
    const expectedDispatchedActions = put(
      generateFakeSnackbarAction('Roster is full.', SnackbarTypes.warning),
    );
    const action = addToRosterModalRequested(fakePokemon);
    const rosterState = [
      fakePokemon,
      fakePokemon,
      fakePokemon,
      fakePokemon,
      fakePokemon,
    ];

    const iterator = addToRosterModalSaga(action);
    iterator.next();

    expect(iterator.next(rosterState).value).toEqual(expectedDispatchedActions);
  });
});
