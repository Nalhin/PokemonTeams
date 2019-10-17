import * as React from 'react';
import { cleanup, render } from '@testing-library/react';
import Tag from '../Tag';
import { TAGS_COLOR } from '../../../styles/tags';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

describe('Tag Component', () => {
  afterEach(cleanup);

  it('Should have correct background and text color', () => {
    const tag = 'Fire';
    const { getByText } = render(<Tag tag={tag} />);

    expect(getByText(tag)).toHaveStyleRule(
      'background',
      TAGS_COLOR[tag].background,
    );
    expect(getByText(tag)).toHaveStyleRule('color', TAGS_COLOR[tag].color);
  });
});
