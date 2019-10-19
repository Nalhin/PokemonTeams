import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import NavLink from '../NavLink';
import { cleanup, fireEvent } from '@testing-library/react';
import { matchers } from 'jest-emotion';
import { createMemoryHistory } from 'history';

expect.extend(matchers);

const mockNavLinkText = 'test';

describe('NavLink Component', () => {
  afterEach(cleanup);

  it('Should highlight active route', () => {
    const route = '/test';
    const { getByText } = renderWithRouter(
      <NavLink to={`${route}`}>{mockNavLinkText}</NavLink>,
      { route },
    );

    expect(getByText(mockNavLinkText)).toHaveStyleRule(
      'transform',
      'scaleX(1)',
      {
        target: '::after',
      },
    );
  });

  it('Should not highlight inactive route', () => {
    const route = '/test';
    const newRoute = '/other-route';
    const { getByText } = renderWithRouter(
      <NavLink to={newRoute}>{mockNavLinkText}</NavLink>,
      { route },
    );

    expect(getByText(mockNavLinkText)).toHaveStyleRule(
      'transform',
      'scaleX(0)',
      {
        target: '::after',
      },
    );
  });

  it('Should redirect when clicked', () => {
    const route = '/test';
    const newRoute = '/other-route';
    const history = createMemoryHistory({ initialEntries: [route] });
    const { getByText } = renderWithRouter(
      <NavLink to={newRoute}>{mockNavLinkText}</NavLink>,
      { route, history },
    );

    fireEvent.click(getByText(mockNavLinkText));

    expect(history.location.pathname).toEqual(newRoute);
  });
});
