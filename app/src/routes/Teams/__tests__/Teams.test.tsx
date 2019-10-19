import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import Teams from '../Teams';
import { fakeTeam } from '../../../../test/fixtures/team';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';

const props = {
  teams: [fakeTeam],
  isLoading: false,
  getTeams: jest.fn(),
  openAddTeamModal: jest.fn(),
};

describe('Teams Component', () => {
  afterEach(cleanup);

  it('Should display Loading', () => {
    const { getByTestId } = renderWithRouter(<Teams {...props} isLoading />);
    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeTruthy();
  });

  it('Should allow to add team', () => {
    const addTeam = jest.fn();
    const { getByTestId } = renderWithRouter(
      <Teams {...props} openAddTeamModal={addTeam} />,
    );
    const addTeamIcon = getByTestId('teams__add-team');

    fireEvent.click(addTeamIcon);

    expect(addTeam).toHaveBeenCalledTimes(1);
  });

  it('Should fire getTeams on init', () => {
    const getTeams = jest.fn();
    renderWithRouter(<Teams {...props} getTeams={getTeams} />);

    expect(getTeams).toHaveBeenCalledTimes(1);
  });
});
