import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import TeamSingleView from '../TeamSingleView';
import { fakeTeam } from '../../../../test/fixtures/team';
import { cleanup, fireEvent } from '@testing-library/react';

const props = {
  getTeam: jest.fn(),
  isLoading: true,
  openEditTeamModal: jest.fn(),
  openDeleteTeamModal: jest.fn(),
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
    const editTeam = jest.fn();
    const { getByTestId } = renderWithRouter(
      <TeamSingleView {...props} openEditTeamModal={editTeam} />,
    );
    const editIcon = getByTestId('team-single-view__edit-icon');

    fireEvent.click(editIcon);

    expect(editTeam).toHaveBeenCalledTimes(1);
  });

  it('Should allow to open delete team modal', () => {
    const openDeleteTeamModal = jest.fn();
    const { getByTestId } = renderWithRouter(
      <TeamSingleView {...props} openDeleteTeamModal={openDeleteTeamModal} />,
    );
    const deleteIcon = getByTestId('team-single-view__delete-icon');

    fireEvent.click(deleteIcon);

    expect(openDeleteTeamModal).toHaveBeenCalledTimes(1);
  });
});
