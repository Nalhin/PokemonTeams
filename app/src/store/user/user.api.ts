import axios from 'axios';
import { loginData } from '../../interfaces/loginData';
import { url } from '../url';
import { registerData } from '../../interfaces/registerData';

export const fetchLoginUser = async (data: loginData) => {
  try {
    const response = await axios.post(`${url}/user/login`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchRegisterUser = async (data: registerData) => {
  try {
    const response = await axios.post(`${url}/user/register`, data);
    return response.data;
  } catch (e) {
    return e;
  }
};
