import * as React from 'react';
import TeamRoster from '../TeamRoster';
import { cleanup, render } from '@testing-library/react';

describe('TeamRoster Component', () => {
  afterEach(cleanup);

  it('Should display message when roster is empty', () => {
    const { getByTestId } = render(<TeamRoster roster={[]} />);

    expect(getByTestId('team__roster--empty')).toBeTruthy();
  });
});
