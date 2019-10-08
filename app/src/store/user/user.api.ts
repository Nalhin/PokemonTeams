import axios from 'axios';
import { LoginData } from '../../interfaces/loginData';
import { url } from '../url';
import { RegisterData } from '../../interfaces/registerData';

export const fetchLoginUser = async (data: LoginData) => {
  try {
    const response = await axios.post(`${url}/user/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchRegisterUser = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${url}/user/register`, data);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchLogoutUser = async () => {
  try {
    const response = await axios.post(`${url}/user/logout`);
    return response.data;
  } catch (e) {}
};
