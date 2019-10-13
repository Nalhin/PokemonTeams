import * as React from 'react';
import Input from '../../components/Input/Input';
import { RegisterData } from '../../interfaces/registerData';
import { RegisterContainerProps } from './Register.container';
import {
  StyledLink,
  StyledLoading,
  StyledLoginContainer,
  StyledWrapper,
} from '../Login/Login';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Button from '../../components/Button/Button';

interface RegisterProps extends RegisterContainerProps {}

const Register: React.FC<RegisterProps> = ({ registerUser, isLoading }) => {
  const [registerValue, setRegisterValue] = React.useState<RegisterData>({
    login: '',
    password: '',
    email: '',
  });

  const handleRegisterUser = () => {
    registerUser(registerValue);
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValue({
      ...registerValue,
      [event.target.name]: event.target.value,
    });
  };

  const { password, login, email } = registerValue;
  return (
    <StyledWrapper>
      <StyledLoading isLoading={isLoading} isRelative>
        <StyledLoginContainer>
          <Input
            value={login}
            name={'login'}
            label={'Login'}
            onChange={handleRegisterChange}
          />
          <PasswordInput
            value={password}
            name={'password'}
            label={'Password'}
            onChange={handleRegisterChange}
          />
          <Input
            value={email}
            name={'email'}
            label={'Email'}
            onChange={handleRegisterChange}
          />
          <StyledLink to="/">Back to login?</StyledLink>
          <Button onClick={handleRegisterUser}>Register</Button>
        </StyledLoginContainer>
      </StyledLoading>
    </StyledWrapper>
  );
};

export default Register;
