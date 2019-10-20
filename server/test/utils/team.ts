import UserModel from '../../src/user/user.model';
import TeamModel from '../../src/team/team.model';
import * as mongoose from 'mongoose';

export const generateOwnerAndTeam = async (fakeOwner, fakeTeam) => {
  const fakeOwnerId = new mongoose.Types.ObjectId();
  const owner = await new UserModel({ ...fakeOwner, _id: fakeOwnerId }).save();
  const fakeTeamId = new mongoose.Types.ObjectId();
  const fakeTeamWithFakeOwnerId = await new TeamModel({
    ...fakeTeam,
    owner: fakeOwnerId,
    _id: fakeTeamId,
  });
  const fakeTeamWithFakeOwner = {
    ...fakeTeamWithFakeOwnerId,
    owner: {
      _id: owner._id,
      login: owner.login,
    },
  };
  return {
    fakeOwnerId,
    fakeTeamId,
    fakeTeamWithFakeOwnerId,
    fakeTeamWithFakeOwner,
    owner,
  };
};

export const generateAuthCookie = async user => {
  const token = await user.generateAuthenticationToken();
  const cookie = `token=${token};`;

  return cookie;
};

export const generateAuthCookieAndUser = async fakeOwner => {
  const fakeUserId = new mongoose.Types.ObjectId();
  const user = await new UserModel({ ...fakeOwner, _id: fakeUserId }).save();
  const cookie = await generateAuthCookie(user);

  return { cookie, fakeUserId };
};
