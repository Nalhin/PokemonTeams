import { Request, Response } from 'express';
import TeamModel from './team.model';
import { Team } from './team.interface';

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams: Team[] = await TeamModel.find({});
    res.send(teams);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const postTeam = async (req: Request, res: Response) => {
  try {
    const teamData: Team = req.body;
    const team = await new TeamModel(teamData).save();
    res.status(201).send(team);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await TeamModel.findById(id);
    if (!team) return res.status(404).send();
    return res.send(team);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const deleteTeam = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await TeamModel.findByIdAndDelete(id);
    if (!team) return res.status(404).send();
    return res.send(team);
  } catch (e) {
    res.status(500).send(e);
  }
};
