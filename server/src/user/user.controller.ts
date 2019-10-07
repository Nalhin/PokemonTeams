import { Request, Response } from 'express';
import UserModel, { IUser } from './user.model';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await new UserModel(req.body).save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { password, login } = req.body;
    const user: IUser = await UserModel.findOne({ login });

    if (!user.comparePassword(password)) {
      return res.status(401).send();
    }
    const token = await user.generateAuthenticationToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
};
