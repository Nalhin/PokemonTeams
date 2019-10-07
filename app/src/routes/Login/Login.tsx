import * as React from 'react';
import Input from '../../components/Input/Input';
import { loginData } from '../../interfaces/loginData';
import { fetchLoginUser } from '../../store/user/user.api';

const Login = () => {
  const [loginValue, setLoginValue] = React.useState<loginData>({
    login: '',
    password: '',
  });

  const handleLoginUser = async () => {
    await fetchLoginUser(loginValue);
  };

  const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginValue({ ...loginValue, [event.target.name]: event.target.value });
  };

  const { password, login } = loginValue;
  return (
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
  );
};

export default Login;
