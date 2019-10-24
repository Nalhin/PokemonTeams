import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import TeamSingleView from '../TeamSingleView';
import { fakeTeam } from '../../../../test/fixtures/team';
import { cleanup, fireEvent } from '@testing-library/react';
import { ModalTypes } from '../../../store/modal/modal.types';

const props = {
  getTeam: jest.fn(),
  isLoading: true,
  openModal: jest.fn(),
  setTeamModal: jest.fn(),
  team: fakeTeam,
};

describe('TeamSingleView Component', () => {
  afterEach(cleanup);

  it('Should display Loading', () => {
    const { getByTestId } = renderWithRouter(
      <TeamSingleView {...props} isLoading />,
    );
    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeTruthy();
  });

  it('Should fire getTeam on init', () => {
    const getTeam = jest.fn();
    renderWithRouter(<TeamSingleView {...props} getTeam={getTeam} />);

    expect(getTeam).toHaveBeenCalledTimes(1);
  });

  it('Should display team data', () => {
    const { getByText } = renderWithRouter(<TeamSingleView {...props} />);

    expect(getByText(fakeTeam.name)).toBeTruthy();
    expect(getByText(fakeTeam.description)).toBeTruthy();
    expect(getByText(fakeTeam.owner.login)).toBeTruthy();
  });

  it('Should allow to open editTeamModal', () => {
    const openModal = jest.fn();
    const setTeamModal = jest.fn();
    const { getByTestId } = renderWithRouter(
      <TeamSingleView
        {...props}
        openModal={openModal}
        setTeamModal={setTeamModal}
      />,
    );
    const editIcon = getByTestId('team-single-view__edit-icon');

    fireEvent.click(editIcon);

    expect(openModal).toHaveBeenCalledTimes(1);
    expect(openModal).toHaveBeenCalledWith(ModalTypes.editTeam);
    expect(setTeamModal).toHaveBeenCalledTimes(1);
    expect(setTeamModal).toHaveBeenCalledWith(props.team);
  });

  it('Should allow to open delete team modal', () => {
    const openModal = jest.fn();
    const { getByTestId } = renderWithRouter(
      <TeamSingleView {...props} openModal={openModal} />,
    );
    const deleteIcon = getByTestId('team-single-view__delete-icon');

    fireEvent.click(deleteIcon);

    expect(openModal).toHaveBeenCalledTimes(1);
    expect(openModal).toHaveBeenCalledWith(ModalTypes.deleteTeam);
  });
});
