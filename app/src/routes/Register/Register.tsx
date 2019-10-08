import * as React from 'react';
import Input from '../../components/Input/Input';
import { RegisterData } from '../../interfaces/registerData';
import { RegisterContainerProps } from './Register.container';

interface RegisterProps extends RegisterContainerProps {}

const Register: React.FC<RegisterProps> = ({ registerUser }) => {
  const [registerValue, setRegisterValue] = React.useState<RegisterData>({
    login: '',
    password: '',
    email: '',
  });

  const handleRegisterUser = async () => {
    await registerUser(registerValue);
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
