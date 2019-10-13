import axios from 'axios';
import { LoginData } from '../../interfaces/loginData';
import { url } from '../url';
import { RegisterData } from '../../interfaces/registerData';

export const fetchLoginUser = (data: LoginData) => {
  return axios.post(`${url}/user/login`, data, {
    withCredentials: true,
  });
};

export const fetchRegisterUser = (data: RegisterData) => {
  return axios.post(`${url}/user/register`, data, {
    withCredentials: true,
  });
};

export const fetchLogoutUser = () => {
  return axios.post(
    `${url}/user/logout`,
    {},
    {
      withCredentials: true,
    },
  );
};

export const fetchAuthorizeUser = () => {
  return axios.get(`${url}/user/authorize`, {
    withCredentials: true,
  });
};
