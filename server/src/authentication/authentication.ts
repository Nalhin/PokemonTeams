import * as jwt from 'jsonwebtoken';
import UserModel from '../user/user.model';
import { Request, Response } from 'express';
import { NextFunction } from 'express';

export const authentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers['x-access-token'];
    const verified = jwt.verify(token, process.env.SECRET);
    const user = await UserModel.findOne({ _id: verified._id, tokens: token });

    if (!user) throw new Error();
    next();
  } catch (e) {
    res.status(401).send();
  }
};
