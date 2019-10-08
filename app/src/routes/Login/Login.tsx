import * as React from 'react';
import Input from '../../components/Input/Input';
import { LoginData } from '../../interfaces/loginData';
import Loading from '../../components/Loading/Loading';
import { LoginContainerProps } from './Login.container';

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
    <Loading isLoading={isLoading}>
      <div>
        <Input
          value={login}
          name={'login'}
          placeholder={'login'}
          onChange={handleLoginChange}
        />
        <Input
          value={password}
          name={'password'}
          placeholder={'password'}
          onChange={handleLoginChange}
        />
        <button onClick={handleLoginUser}>Login</button>
      </div>
    </Loading>
  );
};

export default Login;
