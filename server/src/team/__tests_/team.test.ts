import * as request from 'supertest';
import * as mongoose from 'mongoose';
import app from '../../app';
import TeamModel from '../team.model';
import UserModel from '../../user/user.model';
import { fakeTeam } from '../../../test/fixtures/team';
import { getFakeUser } from '../../../test/fixtures/user';
import {
  generateAuthCookie,
  generateAuthCookieAndUser,
  generateOwnerAndTeam,
} from '../../../test/utils/team';
import PokemonModel from '../../pokemon/pokemon.model';
import { fakePokemon } from '../../../test/fixtures/pokemon';

describe('GET /team', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await UserModel.deleteMany({});
    await PokemonModel.deleteMany({});
  });

  it('Should respond with one team', async () => {
    const fakeUser = getFakeUser();
    const { fakeTeamWithFakeOwner } = await generateOwnerAndTeam(
      fakeUser,
      fakeTeam,
    );
    const expectedResponseBody = [fakeTeamWithFakeOwner];
    const expectedStatus = 200;

    const response = await request(app).get('/team');

    expect(response.status).toBe(expectedStatus);
    expect(response.body.length).toEqual(1);
    expect(JSON.stringify(response.body[0]._id)).toEqual(
      JSON.stringify(expectedResponseBody[0]._id),
    );
  });

  it('Should populate response with pokemon and owner', async () => {
    const fakePokemonId = new mongoose.Types.ObjectId();
    const fakePokemonWithId = { ...fakePokemon, _id: fakePokemonId };
    await new PokemonModel(fakePokemonWithId).save();
    const fakeUser = getFakeUser();
    const { fakeTeamWithFakeOwner } = await generateOwnerAndTeam(fakeUser, {
      ...fakeTeam,
      roster: [fakePokemonId],
    });
    const expectedResponseBody = [
      { ...fakeTeamWithFakeOwner, roster: [fakePokemonWithId] },
    ];
    const expectedStatus = 200;

    const response = await request(app).get('/team');

    expect(response.status).toBe(expectedStatus);
    expect(response.body.length).toEqual(1);
    expect(response.body[0].owner.login).toEqual(
      expectedResponseBody[0].owner.login,
    );
    expect(response.body[0].roster[0].name).toEqual(
      expectedResponseBody[0].roster[0].name,
    );
  });
});

describe('GET /team/:id', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await UserModel.deleteMany({});
    await PokemonModel.deleteMany({});
  });

  it('Should respond with the correct team', async () => {
    await new TeamModel(fakeTeam).save();
    const fakeUser = getFakeUser();
    const { fakeTeamId } = await generateOwnerAndTeam(fakeUser, fakeTeam);
    const expectedResponseStatus = 200;

    const response = await request(app).get(`/team/${fakeTeamId}`);

    expect(response.status).toBe(expectedResponseStatus);
    expect(JSON.stringify(response.body._id)).toEqual(
      JSON.stringify(fakeTeamId),
    );
  });

  it('Should populate response with owner and pokemon', async () => {
    const fakePokemonId = new mongoose.Types.ObjectId();
    const fakePokemonWithId = { ...fakePokemon, _id: fakePokemonId };
    await new PokemonModel(fakePokemonWithId).save();
    const fakeUser = getFakeUser();
    const { fakeTeamId } = await generateOwnerAndTeam(fakeUser, {
      ...fakeTeam,
      roster: [fakePokemonId],
    });
    const expectedResponseStatus = 200;

    const response = await request(app).get(`/team/${fakeTeamId}`);

    expect(response.status).toBe(expectedResponseStatus);
    expect(JSON.stringify(response.body._id)).toEqual(
      JSON.stringify(fakeTeamId),
    );
  });

  it('Should respond with 404, if no team is found', async () => {
    const expectedStatus = 404;

    const response = await request(app)
      .get(`/team/${new mongoose.Types.ObjectId()}`)
      .expect(404);

    expect(response.status).toBe(expectedStatus);
  });
});

describe('POST /team', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it('Should allow to save team, if user is authenticated', async () => {
    const fakeUser = getFakeUser();
    const { cookie, fakeUserId } = await generateAuthCookieAndUser(fakeUser);
    const expectedResponseStatus = 201;

    const response = await request(app)
      .post('/team')
      .set('Cookie', cookie)
      .send(fakeTeam);
    const team = await TeamModel.findById(response.body._id);

    expect(response.status).toBe(expectedResponseStatus);
    expect(JSON.stringify(response.body.owner._id)).toEqual(
      JSON.stringify(fakeUserId),
    );
    expect(team.name).toEqual(fakeTeam.name);
  });

  it('Should not allow to save team without authentication', async () => {
    const expectedResponseStatus = 401;

    const response = await request(app)
      .post('/team')
      .send(fakeTeam);

    expect(response.status).toBe(expectedResponseStatus);
  });
});

describe('POST "team/:id"', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it('Should allow to edit team, if user is authenticated', async () => {
    const fakeUser = getFakeUser();
    const {
      owner,
      fakeTeamId,
      fakeTeamWithFakeOwner,
    } = await generateOwnerAndTeam(fakeUser, fakeTeam);
    const cookie = await generateAuthCookie(owner);
    const expectedResponseStatus = 201;
    const newFakeTeam = { ...fakeTeamWithFakeOwner, name: 'new' };

    const response = await request(app)
      .post(`/team/${fakeTeamId}`)
      .set('Cookie', cookie)
      .send(newFakeTeam);
    const team = await TeamModel.findById(response.body._id);

    expect(response.status).toBe(expectedResponseStatus);
    expect(response.body.name).toEqual(newFakeTeam.name);
    expect(team.name).toEqual(newFakeTeam.name);
  });

  it('Should not allow to edit team, if user is not the owner', async () => {
    const fakeOwner = getFakeUser();
    const { fakeTeamId, fakeTeamWithFakeOwner } = await generateOwnerAndTeam(
      fakeOwner,
      fakeTeam,
    );
    const fakeUser = getFakeUser();
    const user = await new UserModel(fakeUser).save();
    const cookie = await generateAuthCookie(user);
    const editedFakeTeam = { ...fakeTeamWithFakeOwner, name: 'new' };
    const expectedResponseStatus = 401;

    const response = await request(app)
      .post(`/team/${fakeTeamId}`)
      .set('Cookie', cookie)
      .send(editedFakeTeam);
    const team = await TeamModel.findById(fakeTeamId);

    expect(response.status).toBe(expectedResponseStatus);
    expect(team.name).toBe(fakeTeamWithFakeOwner.name);
  });

  it('Should not allow to edit team without authentication', async () => {
    const fakeUser = getFakeUser();
    const { fakeTeamWithFakeOwner } = await generateOwnerAndTeam(
      fakeUser,
      fakeTeam,
    );
    const newFakeTeam = { ...fakeTeamWithFakeOwner, name: 'new' };
    const expectedResponseStatus = 401;

    const response = await request(app)
      .post('/team')
      .send(newFakeTeam);

    expect(response.status).toBe(expectedResponseStatus);
  });
});

describe('DELETE /team/:id', () => {
  afterEach(async () => {
    await TeamModel.deleteMany({});
    await UserModel.deleteMany({});
  });

  it('Should remove team correctly', async () => {
    const fakeUser = getFakeUser();
    const { fakeTeamId, owner } = await generateOwnerAndTeam(
      fakeUser,
      fakeTeam,
    );
    const cookie = await generateAuthCookie(owner);
    const expectedResponseStatus = 200;

    const response = await request(app)
      .delete(`/team/${fakeTeamId}`)
      .set('Cookie', cookie);
    const removedTeam = await TeamModel.findById(fakeTeamId);

    expect(response.status).toBe(expectedResponseStatus);
    expect(JSON.stringify(response.body._id)).toEqual(
      JSON.stringify(fakeTeamId),
    );
    expect(removedTeam).toBeNull();
  });

  it('Should not allow to delete team, if user is not the owner', async () => {
    const fakeOwner = getFakeUser();
    const { fakeTeamId } = await generateOwnerAndTeam(fakeOwner, fakeTeam);
    const fakeUser = getFakeUser();
    const user = await new UserModel(fakeUser).save();
    const cookie = await generateAuthCookie(user);
    const expectedResponseStatus = 401;

    const response = await request(app)
      .delete(`/team/${fakeTeamId}`)
      .set('Cookie', cookie);
    const team = await TeamModel.findById(fakeTeamId);

    expect(response.status).toBe(expectedResponseStatus);
    expect(team).toBeTruthy();
  });

  it('Should not allow to remove team without authentication', async () => {
    const fakeUser = getFakeUser();
    const { fakeTeamId } = await generateOwnerAndTeam(fakeUser, fakeTeam);
    const expectedResponseStatus = 401;

    const response = await request(app).delete(`/team/${fakeTeamId}`);

    expect(response.status).toBe(expectedResponseStatus);
  });
});
