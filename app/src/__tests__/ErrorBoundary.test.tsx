import ErrorBoundary from '../ErrorBoundary';
import * as React from 'react';
import { cleanup, render } from '@testing-library/react';

const ErrorComponent = ({ withError }: { withError?: boolean }): null => {
  if (withError) throw new Error();
  return null;
};

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('ErrorBoundary Component', () => {
  afterEach(cleanup);

  it('Should react to error', () => {
    const { queryByText } = render(
      <ErrorBoundary>
        <ErrorComponent />
      </ErrorBoundary>,
    );

    const error = queryByText(/error/i);

    expect(error).toBeFalsy();
  });

  it('Should react to error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <ErrorComponent withError />
      </ErrorBoundary>,
    );

    const error = getByText(/error/i);

    expect(error).toBeTruthy();
  });
});
