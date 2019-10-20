import axios from 'axios';
import { url } from '../url';

export const fetchGetAllPokemon = () => {
  return axios.get(`${url}/pokemon`);
};

export const fetchGetPokemonById = (id: string) => {
  return axios.get(`${url}/pokemon/${id}`);
};
