import * as request from 'supertest';
import * as mongoose from 'mongoose';
import app from '../app';
import TeamModel from './team.model';
import { fakeTeam } from '../../test/fixtures/team';

const fakeTeamId = new mongoose.Types.ObjectId();
const fakeTeamWithId = { ...fakeTeam, _id: fakeTeamId };

describe('GET /team', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await new TeamModel(fakeTeamWithId).save();
  });

  it('Should respond with one team', async () => {
    const response = await request(app)
      .get('/team')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);
    const { body } = response;
    expect(body.length).toEqual(1);
  });
});

describe('GET /team/:id', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await new TeamModel(fakeTeamWithId).save();
    await new TeamModel(fakeTeam).save();
  });

  it('Should respond with the correct team', async () => {
    const response = await request(app)
      .get(`/team/${fakeTeamId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { body } = response;
    expect(body).not.toBe(null);
    expect(JSON.stringify(body._id)).toEqual(JSON.stringify(fakeTeamId));
  });

  it('Should respond with 404, if no team is found', async () => {
    await request(app)
      .get(`/team/${new mongoose.Types.ObjectId()}`)
      .expect(404);
  });
});

describe('POST /team', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await new TeamModel(fakeTeamWithId).save();
  });

  it('Should save team to the database correctly', async () => {
    const newTeamId = new mongoose.Types.ObjectId();
    const newTeam = {
      ...fakeTeam,
      _id: newTeamId,
    };

    await request(app)
      .post('/team')
      .send(newTeam)
      .expect(201);

    const team = await TeamModel.findById(newTeamId).populate('roster');
    expect(team.toObject({ versionKey: false })).toMatchObject(newTeam);
  });
});

describe('DELETE /team/:id', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await new TeamModel(fakeTeamWithId).save();
  });

  it('Should remove team correctly', async () => {
    await request(app)
      .delete(`/team/${fakeTeamId}`)
      .expect(200);

    const removedTeam = await TeamModel.findById(fakeTeamId);
    expect(removedTeam).toBeNull();
  });

  it('Should return removed team if removed correctly', async () => {
    const response = await request(app)
      .delete(`/team/${fakeTeamId}`)
      .expect(200);

    const { body } = response;

    expect(body).not.toBe(null);
    expect(JSON.stringify(body._id)).toEqual(JSON.stringify(fakeTeamId));
  });

  it('Should respond with 404 if team is not found', async () => {
    await request(app)
      .delete(`/team/${new mongoose.Types.ObjectId()}`)
      .expect(404);
  });
});
