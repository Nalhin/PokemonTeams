import { ModalState, ModalTypes } from '../modal.types';
import {
  addToRosterModalSucceeded,
  closeAllModal,
  closeModal,
  openModal,
  removeFromRosterModal,
  setRosterModal,
  setTeamModal,
  setTeamModalRoster,
} from '../modal.actions';
import modalReducer, { INITIAL_STATE } from '../modal.reducer';
import { fakePokemon } from '../../../../test/fixtures/pokemon';
import { fakeTeam } from '../../../../test/fixtures/team';

describe('Modal Reducer', () => {
  it('Should return the initial state', () => {
    const initialState = { ...INITIAL_STATE };

    const action = closeModal(ModalTypes.editTeam);
    const reducer = modalReducer(undefined, action);

    expect(reducer).toEqual(initialState);
  });

  it('Should handle CLOSE_MODAL action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
      openedModals: [ModalTypes.editTeam, ModalTypes.addTeam],
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
      openedModals: [ModalTypes.addTeam],
    };

    const action = closeModal(ModalTypes.editTeam);
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle OPEN_MODAL action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
      openedModals: [ModalTypes.addTeam],
    };

    const action = openModal(ModalTypes.addTeam);
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle CLOSE_ALL_MODAL action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
      openedModals: [ModalTypes.addTeam, ModalTypes.editTeam],
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
    };

    const action = closeAllModal();
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle SET_ROSTER_MODAL action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
      rosterModal: { roster: [fakePokemon] },
    };

    const action = setRosterModal([fakePokemon]);
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle ADD_TO_ROSTER_MODAL_SUCCEEDED action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
      rosterModal: { roster: [fakePokemon] },
    };

    const action = addToRosterModalSucceeded(fakePokemon);
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle REMOVE_FROM_ROSTER_MODAL action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
      rosterModal: { roster: [fakePokemon] },
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
    };

    const action = removeFromRosterModal(0);
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle SET_TEAM_MODAL action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
      teamModal: { team: fakeTeam },
    };

    const action = setTeamModal(fakeTeam);
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle SET_TEAM_MODAL_ROSTER action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
      teamModal: {
        team: {
          ...fakeTeam,
        },
      },
    };
    const roster = [fakePokemon, fakePokemon];
    const expectedState: ModalState = {
      ...INITIAL_STATE,
      teamModal: {
        team: {
          ...fakeTeam,
          roster,
        },
      },
    };

    const action = setTeamModalRoster(roster);
    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
