import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import TeamCard from '../TeamCard';
import { cleanup, fireEvent } from '@testing-library/react';
import { fakeTeam } from '../../../../test/fixtures/team';
import { matchers } from 'jest-emotion';
import { TEAM_COLORS } from '../../../styles/team';
import { TeamType } from '../../../interfaces/team';

expect.extend(matchers);

describe('TeamCard Component', () => {
  afterEach(cleanup);

  it('Should redirect onClick', () => {
    const route = '/test';
    const { getByTestId, history } = renderWithRouter(
      <TeamCard team={fakeTeam} />,
      {
        route,
      },
    );
    const container = getByTestId(/team__card/i);

    fireEvent.click(container);

    expect(history.location.pathname).toEqual(`/teams/${fakeTeam._id}`);
  });

  it('Should display correct data', () => {
    const { getByText } = renderWithRouter(<TeamCard team={fakeTeam} />);

    expect(getByText(fakeTeam.name)).toBeTruthy();
    expect(getByText(fakeTeam.description)).toBeTruthy();
    expect(getByText(fakeTeam.owner.login)).toBeTruthy();
  });

  it('Should have the correct color based on team type', () => {
    const mockType = TeamType.Valor;
    const mockTeam = { ...fakeTeam, type: mockType };
    const { getByTestId } = renderWithRouter(<TeamCard team={mockTeam} />);
    const container = getByTestId(/team__card/i);

    expect(container).toHaveStyleRule(
      'background',
      `${TEAM_COLORS[mockType]}44`,
    );
    expect(container).toHaveStyleRule(
      'background',
      `${TEAM_COLORS[mockType]}22`,
      { target: ':hover' },
    );
  });
});
