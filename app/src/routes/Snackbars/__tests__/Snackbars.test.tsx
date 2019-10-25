import * as React from 'react';
import { render } from '@testing-library/react';
import Snackbars from '../Snackbars';
import { fakeSnackbar } from '../../../../test/fixtures/snackbar';

describe('Snackbars Component', () => {
  it('Should display snackbar', () => {
    const props = {
      snackbarData: [fakeSnackbar],
      removeSnackbar: jest.fn(),
    };
    const { getByText } = render(<Snackbars {...props} />);

    const snackbar = getByText(fakeSnackbar.message);

    expect(snackbar).toBeTruthy();
  });
});
