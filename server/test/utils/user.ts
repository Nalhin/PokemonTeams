import UserModel from '../../src/user/user.model';
import * as mongoose from 'mongoose';

export const generateAuthCookieAndUser = async fakeUser => {
  const fakeUserId = new mongoose.Types.ObjectId();
  const user = await new UserModel({ ...fakeUser, _id: fakeUserId }).save();
  const token = await user.generateAuthenticationToken();
  const cookie = `token=${token};`;
  return { cookie, fakeUserId };
};

export const generateUserWithId = async fakeUser => {
  const fakeUserId = new mongoose.Types.ObjectId();
  const user = await new UserModel({ ...fakeUser, _id: fakeUserId }).save();
  return { user, fakeUserId };
};
