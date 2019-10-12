import { Request, Response } from 'express';
import UserModel, { IUser } from './user.model';
import { AuthenticationRequest } from '../authentication/authentication.interface';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await new UserModel(req.body).save();
    const token = await user.generateAuthenticationToken();

    res.cookie('token', token, { maxAge: 1000 * 60 * 10, httpOnly: true });
    res.status(201).send({ login: user.login, _id: user._id });
  } catch (e) {
    res.status(400).send(e);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, login } = req.body;
    const user: IUser = await UserModel.findOne({ login });

    if (!user.isPasswordValid(password)) {
      return res.status(401).send();
    }

    const token = await user.generateAuthenticationToken();

    res.cookie('token', token, { maxAge: 1000 * 60 * 10, httpOnly: true });
    res.send({ login: user.login, _id: user._id });
  } catch (e) {
    res.status(400).send();
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token');
    res.status(201).send();
  } catch (e) {
    return res.status(500).send();
  }
};

export const authorizeUser = async (
  req: AuthenticationRequest,
  res: Response,
) => {
  try {
    const { user } = req.locals;
    return res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
};
