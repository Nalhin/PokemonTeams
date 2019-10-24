import * as React from 'react';
import RosterModal from '../RosterModal';
import { cleanup, fireEvent, render } from '@testing-library/react';
import { fakePokemon } from '../../../../../test/fixtures/pokemon';
import { ModalTypes } from '../../../../store/modal/modal.types';

const props = {
  pokemonData: [fakePokemon],
  isLoading: false,
  addToRosterModal: jest.fn(),
  removeFromRosterModal: jest.fn(),
  getAllPokemon: jest.fn(),
  closeModal: jest.fn(),
  saveRoster: jest.fn(),
  roster: [fakePokemon],
};

describe('RosterModal Component', () => {
  afterEach(cleanup);
  it('Should display loading', () => {
    const { getByTestId } = render(<RosterModal {...props} isLoading />);
    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeTruthy();
  });

  it('Should allow to add pokemon', () => {
    const addToRosterModal = jest.fn();
    const { getByTestId } = render(
      <RosterModal {...props} addToRosterModal={addToRosterModal} />,
    );
    const pickerPokemon = getByTestId('roster-modal__picker-pokemon');

    fireEvent.click(pickerPokemon);

    expect(addToRosterModal).toHaveBeenCalledWith(fakePokemon);
  });

  it('Should allow to remove pokemon', () => {
    const removeFromRosterModal = jest.fn();
    const { getByTestId } = render(
      <RosterModal {...props} removeFromRosterModal={removeFromRosterModal} />,
    );
    const pickerPokemon = getByTestId('roster-modal__roster-pokemon');
    const index = 0;

    fireEvent.click(pickerPokemon);

    expect(removeFromRosterModal).toHaveBeenCalledWith(index);
  });

  it('Should allow to save team', () => {
    const closeModal = jest.fn();
    const saveRoster = jest.fn();
    const { getByTestId } = render(
      <RosterModal
        {...props}
        closeModal={closeModal}
        saveRoster={saveRoster}
      />,
    );
    const saveButton = getByTestId('roster-modal__save');

    fireEvent.click(saveButton);

    expect(closeModal).toHaveBeenCalledTimes(1);
    expect(closeModal).toHaveBeenCalledWith(ModalTypes.roster);
    expect(saveRoster).toHaveBeenCalledTimes(1);
    expect(saveRoster).toHaveBeenCalledWith(props.roster);
  });

  it('Should allow to close modal', () => {
    const closeModal = jest.fn();
    const { getByTestId } = render(
      <RosterModal {...props} closeModal={closeModal} />,
    );
    const cancelButton = getByTestId('roster-modal__close');

    fireEvent.click(cancelButton);

    expect(closeModal).toHaveBeenCalledTimes(1);
    expect(closeModal).toHaveBeenCalledWith(ModalTypes.roster);
  });
});
