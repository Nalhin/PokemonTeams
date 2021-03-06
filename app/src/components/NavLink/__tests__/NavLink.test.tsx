import * as React from 'react';
import { renderWithRouter } from '../../../../test/utils/renderWithRouter';
import NavLink from '../NavLink';
import { cleanup, fireEvent } from '@testing-library/react';
import { matchers } from 'jest-emotion';

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

  it('Should highlight activeWith route', () => {
    const route = '/test';
    const to = '/fake';
    const { getByText } = renderWithRouter(
      <NavLink to={to} activeWith={[route]}>
        {mockNavLinkText}
      </NavLink>,
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
    const newRoute = '/other-route';
    const { getByText, history } = renderWithRouter(
      <NavLink to={newRoute}>{mockNavLinkText}</NavLink>,
    );

    fireEvent.click(getByText(mockNavLinkText));

    expect(history.location.pathname).toEqual(newRoute);
  });
});
