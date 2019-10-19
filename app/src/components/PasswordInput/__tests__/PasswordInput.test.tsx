import * as React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import PasswordInput from '../PasswordInput';

const inputProps = {
  value: 'value',
  name: 'name',
  label: 'label',
};

describe('PasswordInput Component', () => {
  afterEach(cleanup);

  it('Should have type password', () => {
    const { getByLabelText } = render(
      <PasswordInput {...inputProps} onChange={jest.fn()} />,
    );
    const input = getByLabelText(inputProps.label);

    expect(input).toHaveProperty('type', 'password');
  });

  it('Should rotate type between password and text onClick', () => {
    const { getByTestId, getByLabelText } = render(
      <PasswordInput {...inputProps} onChange={jest.fn()} />,
    );
    const input = getByLabelText(inputProps.label);
    const button = getByTestId('password-input__icon');

    fireEvent.click(button);

    expect(input).toHaveProperty('type', 'text');

    fireEvent.click(button);

    expect(input).toHaveProperty('type', 'password');
  });

  it('Should fire onChange function', () => {
    const onChange = jest.fn();
    const change = { target: { value: 'a' } };
    const { getByLabelText } = render(
      <PasswordInput {...inputProps} onChange={onChange} />,
    );
    const input = getByLabelText(inputProps.label);

    fireEvent.change(input, change);

    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
