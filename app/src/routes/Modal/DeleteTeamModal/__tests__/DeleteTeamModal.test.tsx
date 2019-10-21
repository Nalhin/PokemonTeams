import * as React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import { fakeTeam } from '../../../../../test/fixtures/team';
import { renderWithRouter } from '../../../../../test/utils/renderWithRouter';
import DeleteTeamModal from '../DeleteTeamModal';

const props = {
  closeModal: jest.fn(),
  deleteTeam: jest.fn(),
  teamId: fakeTeam._id,
};

describe('DeleteTeamModal Component', () => {
  afterEach(cleanup);

  it('Should allow to delete team', () => {
    const deleteTeam = jest.fn();
    const { getByTestId } = renderWithRouter(
      <DeleteTeamModal {...props} deleteTeam={deleteTeam} />,
    );
    const confirmButton = getByTestId('delete-team-modal__confirm');

    fireEvent.click(confirmButton);

    expect(deleteTeam).toHaveBeenCalledTimes(1);
  });

  it('Should close after deleting team', () => {
    const closeModal = jest.fn();
    const { getByTestId } = renderWithRouter(
      <DeleteTeamModal {...props} deleteTeam={closeModal} />,
    );
    const confirmButton = getByTestId('delete-team-modal__confirm');

    fireEvent.click(confirmButton);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('Should allow to close', () => {
    const closeModal = jest.fn();
    const { getByTestId } = renderWithRouter(
      <DeleteTeamModal {...props} closeModal={closeModal} />,
    );
    const confirmButton = getByTestId('delete-team-modal__close');

    fireEvent.click(confirmButton);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });
});
