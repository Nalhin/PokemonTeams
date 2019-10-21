import { ModalState, ModalTypes } from '../modal.types';
import { closeAllModal, closeModal, openModal } from '../modal.actions';
import modalReducer, { INITIAL_STATE } from '../modal.reducer';

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
      openModals: [ModalTypes.editTeam, ModalTypes.addTeam],
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
      openModals: [ModalTypes.addTeam],
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
      openModals: [ModalTypes.addTeam],
    };
    const action = openModal(ModalTypes.addTeam);

    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });

  it('Should handle CLOSE_ALL_MODAL action', () => {
    const initialState: ModalState = {
      ...INITIAL_STATE,
      openModals: [ModalTypes.addTeam, ModalTypes.editTeam],
    };
    const expectedState: ModalState = {
      ...INITIAL_STATE,
    };
    const action = closeAllModal();

    const reducer = modalReducer(initialState, action);

    expect(reducer).toEqual(expectedState);
  });
});
