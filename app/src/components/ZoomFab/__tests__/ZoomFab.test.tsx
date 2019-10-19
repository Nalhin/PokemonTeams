import * as React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import ZoomFab from '../ZoomFab';

describe('ZoomFab Component', () => {
  afterEach(cleanup);

  it('Should fire onClick event when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(
      <ZoomFab icon={<div />} onClick={onClick} />,
    );

    fireEvent.click(getByTestId('zoom__fab'));

    expect(onClick).toBeCalledTimes(1);
  });
});
