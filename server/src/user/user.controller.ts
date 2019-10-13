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
    if (e.code === 11000)
      return res
        .status(400)
        .send({ error: 'Login or email is already taken.' });
    res.status(500).send();
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, login } = req.body;
    const user: IUser = await UserModel.findOne({ login });

    if (!user) {
      return res.status(404).send({ error: 'Incorrect credentials.' });
    }
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return res.status(404).send({ error: 'Incorrect credentials.' });
    }

    const token = await user.generateAuthenticationToken();

    res.cookie('token', token, { maxAge: 1000 * 60 * 10, httpOnly: true });
    res.status(201).send({ login: user.login, _id: user._id });
  } catch (e) {
    res.status(500).send();
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', { httpOnly: true });
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
    const { login, _id } = user;
    return res.status(201).send({ login, _id });
  } catch (e) {
    res.status(500).send(e);
  }
};
