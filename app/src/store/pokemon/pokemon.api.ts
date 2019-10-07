import axios from 'axios';
import { url } from '../url';

export const fetchGetAllPokemon = async () => {
  try {
    const response = await axios.get(`${url}/pokemon`, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchGetPokemonById = async (id: string) => {
  try {
    const response = await axios.get(`${url}/pokemon/${id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
