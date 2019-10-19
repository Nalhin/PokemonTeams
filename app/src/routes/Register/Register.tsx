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
import { hasEmptyFields } from '../../utils/hasEmptyField';

interface RegisterProps extends RegisterContainerProps {}

const Register: React.FC<RegisterProps> = ({ registerUser, isLoading }) => {
  const [registerValues, setRegisterValues] = React.useState<RegisterData>({
    login: '',
    password: '',
    email: '',
  });

  const handleRegisterUser = () => {
    if (!hasEmptyFields<RegisterData>(registerValues))
      registerUser(registerValues);
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };

  const { password, login, email } = registerValues;
  return (
    <StyledWrapper data-testid="register">
      <StyledLoading isLoading={isLoading} isRelative>
        <StyledLoginContainer>
          <Input
            value={login}
            name="login"
            label="Login"
            onChange={handleRegisterChange}
          />
          <PasswordInput
            value={password}
            name="password"
            label="Password"
            onChange={handleRegisterChange}
          />
          <Input
            value={email}
            name="email"
            label="Email"
            onChange={handleRegisterChange}
          />
          <StyledLink to="/" data-testid="register__login-link">
            Back to login?
          </StyledLink>
          <Button
            onClick={handleRegisterUser}
            data-testid="register__register-button"
          >
            Register
          </Button>
        </StyledLoginContainer>
      </StyledLoading>
    </StyledWrapper>
  );
};

export default Register;
