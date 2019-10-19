import * as React from 'react';
import styled from '@emotion/styled';
import Paper from '@material-ui/core/Paper';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import PasswordInput from '../../components/PasswordInput/PasswordInput';
import Loading from '../../components/Loading/Loading';
import { LoginContainerProps } from './Login.container';
import { LoginData } from '../../interfaces/loginData';
import { PADDING } from '../../styles/padding';
import { Link } from 'react-router-dom';
import { COLORS } from '../../styles/colors';
import { hasEmptyFields } from '../../utils/hasEmptyField';

export const StyledWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledLoading = styled(Loading)`
  width: 90%;
  max-width: 400px;
`;

export const StyledLoginContainer = styled(Paper)`
  padding: ${PADDING.LARGE};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

export const StyledLink = styled(Link)`
  color: ${COLORS.MAIN};
  text-decoration: none;
  margin-left: auto;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`;

interface LoginProps extends LoginContainerProps {}

const INITIAL_STATE: LoginData = {
  login: '',
  password: '',
};

const Login: React.FC<LoginProps> = ({ loginUser, isLoading }) => {
  const [loginValues, setLoginValues] = React.useState<LoginData>(
    INITIAL_STATE,
  );

  const handleLoginUser = () => {
    if (!hasEmptyFields<LoginData>(loginValues)) loginUser(loginValues);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValues({ ...loginValues, [event.target.name]: event.target.value });
  };

  const { password, login } = loginValues;
  return (
    <StyledWrapper data-testid="login">
      <StyledLoading isLoading={isLoading}>
        <StyledLoginContainer>
          <Input
            value={login}
            name={'login'}
            label={'Login'}
            onChange={handleLoginChange}
          />
          <PasswordInput
            value={password}
            name={'password'}
            label={'Password'}
            onChange={handleLoginChange}
          />
          <StyledLink to="/register" data-testid="login__register-link">
            Don't have an account?
          </StyledLink>
          <Button onClick={handleLoginUser} data-testid="login__login-button">
            Login
          </Button>
        </StyledLoginContainer>
      </StyledLoading>
    </StyledWrapper>
  );
};

export default Login;
