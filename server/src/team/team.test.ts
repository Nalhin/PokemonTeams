import * as request from 'supertest';
import * as mongoose from 'mongoose';
import app from '../app';
import TeamModel from './team.model';

const mockTeamId = new mongoose.Types.ObjectId();

const mockTeam = {
  ownerId: '5',
  name: 'Test Team',
  description: 'Test Team with super cool pokemon',
  roster: ['1', '2', '3'],
};

describe('GET /team', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await new TeamModel({ ...mockTeam, _id: mockTeamId }).save();
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
    await new TeamModel({ ...mockTeam, _id: mockTeamId }).save();
    await new TeamModel({ ...mockTeam, name: 'Wrong Team' }).save();
  });

  it('Should respond with the correct team', async () => {
    const response = await request(app)
      .get(`/team/${mockTeamId}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    const { body } = response;
    expect(body).toMatchObject(mockTeam);
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
    await new TeamModel({ ...mockTeam, _id: mockTeamId }).save();
  });

  it('Should save team to the database correctly', async () => {
    const newTeamId = new mongoose.Types.ObjectId();
    const newTeam = {
      ...mockTeam,
      _id: newTeamId,
    };

    await request(app)
      .post('/team')
      .send(newTeam)
      .expect(201);

    const team = await TeamModel.findById(newTeamId);
    expect(team.toObject({ versionKey: false })).toMatchObject(newTeam);
  });
});

describe('DELETE /team/:id', () => {
  beforeEach(async () => {
    await TeamModel.deleteMany({});
    await new TeamModel({ ...mockTeam, _id: mockTeamId }).save();
  });

  it('Should remove team correctly', async () => {
    await request(app)
      .delete(`/team/${mockTeamId}`)
      .expect(200);

    const removedTeam = await TeamModel.findById(mockTeamId);
    expect(removedTeam).toBeNull();
  });

  it('Should return removed team if removed correctly', async () => {
    const response = await request(app)
      .delete(`/team/${mockTeamId}`)
      .expect(200);

    const { body } = response;
    expect(body).toMatchObject(mockTeam);
  });

  it('Should respond with 404 if team is not found', async () => {
    await request(app)
      .delete(`/team/${new mongoose.Types.ObjectId()}`)
      .expect(404);
  });
});
