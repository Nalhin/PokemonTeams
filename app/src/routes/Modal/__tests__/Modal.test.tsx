import * as React from 'react';
import Modal from '../Modal';
import { renderWithStore } from '../../../../test/utils/renderWithStore';
import { ModalTypes } from '../../../store/modal/modal.types';

describe('Modal Component', () => {
  it('Should fire closeAllModal if history gets popped', () => {
    const closeAllModal = jest.fn();
    const { history } = renderWithStore(
      <Modal closeAllModal={closeAllModal} isModalOpen openModals={[]} />,
    );

    history.goBack();

    expect(closeAllModal).toHaveBeenCalledTimes(1);
  });

  it('Should display loading indicator if modal is shown', () => {
    const openModals = [ModalTypes.addTeam];
    const { getByTestId } = renderWithStore(
      <Modal closeAllModal={jest.fn()} isModalOpen openModals={openModals} />,
    );
    const loading = getByTestId('loading-spinner');

    expect(loading).toBeTruthy();
  });

  it('Should display AddTeamModal', () => {});
  it('Should display EditTeamModal', async () => {
    const openModals = [ModalTypes.editTeam];
    const { findByTestId } = renderWithStore(
      <Modal closeAllModal={jest.fn()} isModalOpen openModals={openModals} />,
    );

    const deleteTeamModal = await findByTestId('edit-team-modal');

    expect(deleteTeamModal).toBeTruthy();
  });
  it('Should display DeleteTeamModal', async () => {
    const openModals = [ModalTypes.deleteTeam];
    const { findByTestId } = renderWithStore(
      <Modal closeAllModal={jest.fn()} isModalOpen openModals={openModals} />,
    );

    const deleteTeamModal = await findByTestId('delete-team-modal');

    expect(deleteTeamModal).toBeTruthy();
  });
});
