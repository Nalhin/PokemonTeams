import * as React from 'react';
import Input from '../../components/Input/Input';
import { registerData } from '../../interfaces/registerData';
import { fetchRegisterUser } from '../../store/user/user.api';

const Register = () => {
  const [registerValue, setRegisterValue] = React.useState<registerData>({
    login: '',
    password: '',
    email: '',
  });

  const handleRegisterUser = async () => {
    await fetchRegisterUser(registerValue);
  };

  const handleRegisterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterValue({
      ...registerValue,
      [event.target.name]: event.target.value,
    });
  };

  const { password, login, email } = registerValue;
  return (
    <div>
      <Input
        value={login}
        name={'login'}
        placeholder={'login'}
        onChange={handleRegisterChange}
      />
      <Input
        value={password}
        name={'password'}
        placeholder={'password'}
        onChange={handleRegisterChange}
      />
      <Input
        value={email}
        name={'email'}
        placeholder={'email'}
        onChange={handleRegisterChange}
      />
      <button onClick={handleRegisterUser}>Register</button>
    </div>
  );
};

export default Register;
