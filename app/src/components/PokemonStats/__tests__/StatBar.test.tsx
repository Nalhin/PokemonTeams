import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import StatBar, { MAX_STAT } from '../StatBar';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

const statBar = {
  name: 'Test stat',
  data: 40,
  shortName: 'TS',
};

describe('StatBar Component', () => {
  beforeEach(cleanup);

  it('Should display data and shortName', () => {
    const { getByText } = render(<StatBar {...statBar} />);

    expect(getByText(`${statBar.data}`)).toBeTruthy();
    expect(getByText(statBar.shortName)).toBeTruthy();
  });

  it('Should display correct bar values', () => {
    const { getByTestId } = render(<StatBar {...statBar} />);
    const statDisplay = getByTestId('stat-bar__stat-display');

    expect(statDisplay).toHaveStyleRule(
      'height',
      `${(statBar.data / MAX_STAT) * 100}%`,
    );
  });
});
