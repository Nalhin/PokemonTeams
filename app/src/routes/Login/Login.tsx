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

export const StyledLoginContainer = styled(Paper)`
  padding: ${PADDING.LARGE};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 90%;
  max-width: 450px;
`;

interface LoginProps extends LoginContainerProps {}

const Login: React.FC<LoginProps> = ({ loginUser, isLoading }) => {
  const [loginValue, setLoginValue] = React.useState<LoginData>({
    login: '',
    password: '',
  });

  const handleLoginUser = async () => {
    await loginUser(loginValue);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, [event.target.name]: event.target.value });
  };

  const { password, login } = loginValue;
  return (
    <Loading isLoading={isLoading} isRelative>
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
        <Button onClick={handleLoginUser}>Login</Button>
      </StyledLoginContainer>
    </Loading>
  );
};

export default Login;
