import * as mongoose from 'mongoose';
import { fakeUser, fakeUserId } from './user';

export const fakeTeam = {
  owner: fakeUserId,
  name: 'Test Team',
  description: 'Test Team with super cool pokemon',
  roster: [],
};

export const fakeTeamId = new mongoose.Types.ObjectId();
export const fakeTeamWithId = { ...fakeTeam, _id: fakeTeamId };
export const fakeTeamWithFakeUser = {
  ...fakeTeamWithId,
  owner: { _id: fakeUserId, login: fakeUser.login },
};
