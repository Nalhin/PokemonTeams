import { cleanup, fireEvent } from '@testing-library/react';
import React from 'react';
import Teams, { INITIAL_TEAM_STATE } from '../Teams';
import { fakeTeam } from '../../../../test/fixtures/team';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import { ModalTypes } from '../../../store/modal/modal.types';

const props = {
  teams: [fakeTeam],
  isLoading: false,
  getTeams: jest.fn(),
  openModal: jest.fn(),
  setTeamModal: jest.fn(),
  loadMoreTeams: jest.fn(),
  loaded: 20,
};

describe('Teams Component', () => {
  afterEach(cleanup);

  it('Should display Loading', () => {
    const { getByTestId } = renderWithRouter(<Teams {...props} isLoading />);
    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeTruthy();
  });

  it('Should allow to add team', () => {
    const openModal = jest.fn();
    const setTeamModal = jest.fn();
    const { getByTestId } = renderWithRouter(
      <Teams {...props} openModal={openModal} setTeamModal={setTeamModal} />,
    );
    const addTeamIcon = getByTestId('teams__add-team');

    fireEvent.click(addTeamIcon);

    expect(openModal).toHaveBeenCalledTimes(1);
    expect(openModal).toHaveBeenCalledWith(ModalTypes.addTeam);
    expect(setTeamModal).toHaveBeenCalledWith(INITIAL_TEAM_STATE);
  });

  it('Should fire getTeams on init', () => {
    const getTeams = jest.fn();
    renderWithRouter(<Teams {...props} getTeams={getTeams} />);

    expect(getTeams).toHaveBeenCalledTimes(1);
  });
});
