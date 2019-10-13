import axios from 'axios';
import { url } from '../url';
import { Team } from '../../interfaces/team';
import { NewTeam } from '../../interfaces/newTeam';

export const fetchGetTeams = () => {
  return axios.get(`${url}/team`);
};

export const fetchGetTeamById = (_id: string) => {
  return axios.get(`${url}/team/${_id}`);
};

export const fetchSaveTeam = (team: NewTeam) => {
  return axios.post(`${url}/team`, team, {
    withCredentials: true,
  });
};

export const fetchEditTeam = async (team: Team) => {
  return await axios.post(`${url}/team/${team._id}`, team, {
    withCredentials: true,
  });
};

export const fetchDeleteTeam = async (_id: string) => {
  return await axios.delete(`${url}/team/${_id}`, {
    withCredentials: true,
  });
};
