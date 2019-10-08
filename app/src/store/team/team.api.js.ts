import axios from 'axios';
import { url } from '../url';
import { Team } from '../../interfaces/team';
import { NewTeam } from '../../interfaces/newTeam';

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

export const fetchSaveTeam = async (team: NewTeam) => {
  try {
    const response = await axios.post(`${url}/team`, team, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchEditTeam = async (team: Team) => {
  try {
    const response = await axios.post(`${url}/team/${team._id}`, team, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};

export const fetchDeleteTeam = async (_id: string) => {
  try {
    const response = await axios.delete(`${url}/team/${_id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (e) {
    return e;
  }
};
