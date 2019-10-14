import { Request, Response } from 'express';
import TeamModel from './team.model';
import { Team } from './team.interface';
import { AuthenticationRequest } from '../authentication/authentication.interface';

export const getTeams = async (req: Request, res: Response) => {
  try {
    const teams: Team[] = await TeamModel.find({})
      .populate('roster')
      .populate('owner', 'login');
    res.send(teams);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const saveTeam = async (req: AuthenticationRequest, res: Response) => {
  try {
    const teamData: Team = req.body;
    const team = await new TeamModel({
      ...teamData,
      owner: req.locals.user._id,
    }).save();

    res.status(201).send(team);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const getTeamById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const team = await TeamModel.findById(id)
      .populate('roster')
      .populate('owner', 'login');
    if (!team) return res.status(404).send();
    return res.send(team);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const editTeam = async (req: AuthenticationRequest, res: Response) => {
  try {
    const { _id, type, name, description, roster } = req.body;

    const userId = req.locals.user._id;
    const oldTeam = await TeamModel.findById(_id);

    if (userId.toString() !== oldTeam.owner.toString())
      return res.status(401).send({ error: 'You do not own this team.' });

    const updatedTeam = await TeamModel.findByIdAndUpdate(
      _id,
      { type, name, description, roster },
      { new: true },
    ).populate('roster');
    return res.status(201).send(updatedTeam);
  } catch (e) {
    res.status(500).send(e);
  }
};

export const deleteTeam = async (req: AuthenticationRequest, res: Response) => {
  try {
    const { id } = req.params;

    const userId = req.locals.user._id;
    const oldTeam = await TeamModel.findById(id);

    if (userId.toString() !== oldTeam.owner.toString())
      return res.status(401).send({ error: 'You do not own this team.' });

    const team = await TeamModel.findByIdAndDelete(id);
    if (!team) return res.status(404).send();
    return res.send(team);
  } catch (e) {
    res.status(500).send(e);
  }
};
