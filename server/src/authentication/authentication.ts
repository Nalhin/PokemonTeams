import * as jwt from 'jsonwebtoken';
import UserModel from '../user/user.model';
import { NextFunction, Response } from 'express';
import { AuthenticationRequest } from './authentication.interface';

export const authentication = async (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;
    const verified = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findOne({ _id: verified._id, tokens: token });

    if (!user) res.status(401).send({ error: 'Unauthorized.' });

    req.locals = { user };
    next();
  } catch (e) {
    res.status(401).send({ error: 'Unauthorized.' });
  }
};
