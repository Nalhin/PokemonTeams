import * as React from 'react';
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import { PADDING } from '../../styles/padding';

const StyledTextField = styled(TextField)<{}>`
  margin: ${PADDING.BASE} 0;
`;

export interface InputProps {
  value: string;
  name: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ value, name, label, onChange }) => {
  return (
    <StyledTextField
      value={value}
      name={name}
      onChange={onChange}
      label={label}
      type="text"
    />
  );
};

export default Input;
