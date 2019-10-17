import * as React from 'react';
import styled from '@emotion/styled';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import { PADDING } from '../../styles/padding';
import { InputProps } from '../Input/Input';

const StyledFormControl = styled(FormControl)<{}>`
  margin: ${PADDING.BASE} 0;
`;

const PasswordInput: React.FC<InputProps> = ({
  value,
  name,
  label,
  onChange,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <StyledFormControl>
      <InputLabel>{label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        name={name}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleShowPasswordChange}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
    </StyledFormControl>
  );
};

export default PasswordInput;
