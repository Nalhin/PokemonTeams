import { cleanup, fireEvent, render } from '@testing-library/react';
import * as React from 'react';
import Snackbar from '../Snackbar';
import { SnackbarTypes } from '../../../interfaces/snackbar';
import { SNACKBAR_COLORS } from '../../../styles/snackbar';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

describe('Snackbar Component', () => {
  afterEach(cleanup);

  it('Should display correct message', () => {
    const message = 'test';
    const { getByText } = render(
      <Snackbar
        onClose={() => {}}
        message={message}
        id={'1'}
        type={SnackbarTypes.success}
      />,
    );

    expect(getByText(message)).toBeTruthy();
  });

  it('Should fire onClose function when closeIcon is clicked', () => {
    const onClose = jest.fn();
    const id = '1';
    const { getByTestId } = render(
      <Snackbar
        onClose={onClose}
        message={'test'}
        id={id}
        type={SnackbarTypes.success}
      />,
    );

    fireEvent.click(getByTestId(/snackbar__close-icon/));

    expect(onClose).toHaveBeenCalledWith(id);
  });

  it('Should change background color based on type', () => {
    const { getByTestId } = render(
      <Snackbar
        onClose={() => {}}
        message={'test'}
        id="1"
        type={SnackbarTypes.success}
      />,
    );

    expect(getByTestId(/snackbar__content/i)).toHaveStyleRule(
      'background',
      SNACKBAR_COLORS[SnackbarTypes.success],
    );
  });
});
