import * as request from 'supertest';
import * as mongoose from 'mongoose';

import UserModel from './user.model';
import app from '../app';

const mockUser = {
  login: 'Login',
  password: 'Password',
  email: 'Email@email',
};

describe('POST /user/register', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it('Should register user correctly', async () => {
    const newUserId = new mongoose.Types.ObjectId();
    const newUser = {
      ...mockUser,
      _id: newUserId,
    };
    await request(app)
      .post('/user/register')
      .send(newUser)
      .expect(201);

    const user = await UserModel.findById(newUserId);
    expect(user.toObject({ versionKey: false })).toMatchObject(newUser);
  });

  it('Should not allow to register the same user', async () => {
    await request(app)
      .post('/user/register')
      .send(mockUser)
      .expect(201);

    await request(app)
      .post('/user/register')
      .send(mockUser)
      .expect(400);
  });
});
