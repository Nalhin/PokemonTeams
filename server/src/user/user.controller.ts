import { Request, Response } from 'express';
import UserModel from './user.model';
import { User } from './user.interface';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const userData: User = req.body;
    const user = await new UserModel(userData).save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

// export const loginUser = async (req:Request, res:Response)=>{
//   try {
//     const user =
//   }catch (e) {
//
//   }
// }
