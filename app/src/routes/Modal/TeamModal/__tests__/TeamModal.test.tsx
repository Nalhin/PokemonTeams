import { cleanup, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import TeamModal from '../TeamModal';
import { fakeTeam } from '../../../../../test/fixtures/team';
import { ModalTypes } from '../../../../store/modal/modal.types';

const props = {
  onConfirm: jest.fn(),
  isLoading: false,
  closeModal: jest.fn(),
  openModal: jest.fn(),
  setTeamModal: jest.fn(),
  setRosterModal: jest.fn(),
  teamState: fakeTeam,
};

describe('TeamModal Component', () => {
  afterEach(cleanup);

  it('Should display loading', () => {
    const { getByTestId } = render(<TeamModal {...props} isLoading />);

    const loadingSpinner = getByTestId('loading-spinner');

    expect(loadingSpinner).toBeTruthy();
  });

  it('Should display team data', () => {
    const teamState = fakeTeam;
    const { getByText, getAllByAltText } = render(
      <TeamModal {...props} teamState={teamState} />,
    );

    const teamName = getByText(teamState.name);
    const teamDescription = getByText(teamState.description);
    const teamRoster = getAllByAltText(teamState.roster[0].name);

    expect(teamName).toBeTruthy();
    expect(teamDescription).toBeTruthy();
    expect(teamRoster).toBeTruthy();
  });

  it('Should allow to change roster', () => {
    const setRosterModal = jest.fn();
    const openModal = jest.fn();
    const teamState = fakeTeam;

    const { getByTestId } = render(
      <TeamModal
        {...props}
        setRosterModal={setRosterModal}
        openModal={openModal}
        teamState={teamState}
      />,
    );

    const changeRosterButton = getByTestId('team-modal__change-roster');
    fireEvent.click(changeRosterButton);

    expect(setRosterModal).toHaveBeenCalledTimes(1);
    expect(setRosterModal).toHaveBeenCalledWith(teamState.roster);
    expect(openModal).toHaveBeenCalledTimes(1);
    expect(openModal).toHaveBeenCalledWith(ModalTypes.roster);
  });

  it('Should allow to save', () => {
    const onConfirm = jest.fn();
    const teamState = fakeTeam;

    const { getByTestId } = render(
      <TeamModal {...props} onConfirm={onConfirm} teamState={teamState} />,
    );

    const saveButton = getByTestId('team-modal__save');
    fireEvent.click(saveButton);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onConfirm).toHaveBeenCalledWith(teamState);
  });

  it('Should allow to close', () => {
    const closeModal = jest.fn();

    const { getByTestId } = render(
      <TeamModal {...props} closeModal={closeModal} />,
    );

    const closeButton = getByTestId('team-modal__close');
    fireEvent.click(closeButton);

    expect(closeModal).toHaveBeenCalledTimes(1);
  });

  it('Should debounce inputs', () => {
    const setTeamModal = jest.fn();
    const teamState = fakeTeam;
    const firstValue = '23';
    const secondValue = '233';
    const values = {
      first: { target: { value: firstValue } },
      second: { target: { value: secondValue } },
    };

    const { getByLabelText } = render(
      <TeamModal
        {...props}
        teamState={teamState}
        setTeamModal={setTeamModal}
      />,
    );

    const teamInput = getByLabelText('Team name');
    fireEvent.change(teamInput, values.first);
    fireEvent.change(teamInput, values.second);

    expect(setTeamModal).toHaveBeenCalledTimes(0);
    expect(teamInput).toHaveProperty('value', secondValue);
  });

  it('Should save on input blur', () => {
    const setTeamModal = jest.fn();
    const teamState = fakeTeam;

    const { getByLabelText } = render(
      <TeamModal
        {...props}
        teamState={teamState}
        setTeamModal={setTeamModal}
      />,
    );

    const teamInput = getByLabelText('Team name');
    fireEvent.blur(teamInput);

    expect(setTeamModal).toHaveBeenCalledTimes(1);
    expect(setTeamModal).toHaveBeenCalledWith(teamState);
  });
});
