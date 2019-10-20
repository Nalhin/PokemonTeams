import * as mongoose from 'mongoose';

export const fakeUser = {
  login: 'login',
  password: 'password',
  email: 'email@email',
};

export const fakeUserId = new mongoose.Types.ObjectId();

export const fakeUserWithId = {
  ...fakeUser,
  _id: fakeUserId,
};
