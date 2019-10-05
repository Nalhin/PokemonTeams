import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Loading from './Loading';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

describe('Loading Component', () => {
  afterEach(cleanup);

  it('Should display spinner when isLoading flag is true', () => {
    const { getByTestId } = render(
      <Loading isLoading>
        <div />
      </Loading>,
    );

    expect(getByTestId(/loading_spinner/)).not.toBeNull();
  });

  it('Should hide spinner when isLoading is false', () => {
    const { queryByTestId } = render(
      <Loading isLoading={false}>
        <div />
      </Loading>,
    );

    expect(queryByTestId(/loading_spinner/)).toBeNull();
  });

  it('Should display children correctly', () => {
    const { getByText } = render(
      <Loading isLoading={false}>
        <div>test</div>
      </Loading>,
    );

    expect(getByText(/test/)).not.toBeNull();
  });

  it('Should set wrapper position to relative when isRelative is true', () => {
    const { getByTestId } = render(
      <Loading isRelative isLoading={false}>
        <div />
      </Loading>,
    );
    expect(getByTestId(/loading_wrapper/)).toHaveStyleRule(
      'position',
      'relative',
    );
  });
  it('Should not ser wrapper position to relative when isRelative is false', () => {
    const { getByTestId } = render(
      <Loading isLoading={false}>
        <div />
      </Loading>,
    );
    expect(getByTestId(/loading_wrapper/)).not.toHaveStyleRule(
      'position',
      'relative',
    );
  });
});
