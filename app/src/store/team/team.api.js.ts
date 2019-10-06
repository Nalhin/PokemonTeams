import axios from 'axios';
import { url } from '../url';
import { Team } from '../../interfaces/team';

export const fetchGetTeams = async () => {
  try {
    const response = await axios.get(`${url}/team`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchGetTeamById = async (_id: string) => {
  try {
    const response = await axios.get(`${url}/team/${_id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchSaveTeam = async (team: Team) => {
  try {
    const response = await axios.post(`${url}/team`, team);
    return response.data;
  } catch (e) {
    return e;
  }
};
export const fetchDeleteTeam = async (_id: string) => {
  try {
    const response = await axios.delete(`${url}/team/${_id}`);
    return response.data;
  } catch (e) {
    return e;
  }
};
