import * as request from 'supertest';
import UserModel from '../user.model';
import app from '../../app';
import { getFakeUser } from '../../../test/fixtures/user';
import * as mongoose from 'mongoose';
import {
  generateAuthCookieAndUser,
  generateUserWithId,
} from '../../../test/utils/user';

afterAll(() => {
  mongoose.connection.close();
});

describe('POST /user/register', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it('Should register user correctly', async () => {
    const fakeUserId = new mongoose.Types.ObjectId();
    const fakeUser = getFakeUser();
    const expectedResponseStatus = 201;
    const expectedResponseBody = {
      login: fakeUser.login,
      _id: fakeUserId,
    };

    const response = await request(app)
      .post('/user/register')
      .send({ ...fakeUser, _id: fakeUserId });
    const authCookie = response.header['set-cookie'][0];
    const user = await UserModel.findById(fakeUserId);
    const token = user.tokens[0];

    expect(response.status).toBe(expectedResponseStatus);
    expect(JSON.stringify(response.body)).toEqual(
      JSON.stringify(expectedResponseBody),
    );
    expect(user.login).toBe(fakeUser.login);
    expect(user.password).not.toBe(fakeUser.password);
    expect(authCookie).toMatch(token);
  });

  it('Should not allow to register the same user', async () => {
    const fakeUser = getFakeUser();
    const expectedFirstResponseStatus = 201;
    const expectedSecondResponseStatus = 400;

    const firstResponse = await request(app)
      .post('/user/register')
      .send(fakeUser);

    const secondResponse = await request(app)
      .post('/user/register')
      .send(fakeUser);

    expect(firstResponse.status).toBe(expectedFirstResponseStatus);
    expect(secondResponse.status).toBe(expectedSecondResponseStatus);
  });
});

describe('POST /user/login', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it('Should login existing user correctly', async () => {
    const fakeUser = getFakeUser();
    const { user, fakeUserId } = await generateUserWithId(fakeUser);
    await user.generateAuthenticationToken();
    const token = user.tokens[0];
    const requestData = {
      login: fakeUser.login,
      password: fakeUser.password,
    };
    const expectedResponseBody = {
      login: fakeUser.login,
      _id: fakeUserId,
    };
    const expectedResponseStatus = 201;

    const response = await request(app)
      .post('/user/login')
      .send(requestData);
    const authCookie = response.header['set-cookie'][0];

    expect(response.status).toBe(expectedResponseStatus);
    expect(JSON.stringify(response.body)).toEqual(
      JSON.stringify(expectedResponseBody),
    );
    expect(authCookie).toMatch(token);
  });

  it('Should respond with 404, if password is incorrect', async () => {
    const fakeUser = getFakeUser();
    await new UserModel(fakeUser).save();
    const requestData = {
      login: fakeUser.login,
      password: '',
    };
    const expectedResponseStatus = 404;

    const response = await request(app)
      .post('/user/login')
      .send(requestData);

    expect(response.status).toBe(expectedResponseStatus);
  });

  it('Should respond with 404, if login is incorrect', async () => {
    const fakeUser = getFakeUser();
    await new UserModel(fakeUser).save();
    const requestData = {
      login: '',
      password: fakeUser.password,
    };
    const expectedResponseStatus = 404;

    const response = await request(app)
      .post('/user/login')
      .send(requestData);

    expect(response.status).toBe(expectedResponseStatus);
  });
});

describe('POST /user/logout', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it('Should clear authentication cookie', async () => {
    const initialToken = 'token=token';
    const expectedExpirationTime = 'Expires=Thu, 01 Jan 1970 00:00:00 GMT;';
    const expectedToken = 'token=;';

    const response = await request(app)
      .post('/user/logout')
      .withCredentials()
      .set('Cookie', initialToken);
    const authCookie = response.header['set-cookie'][0];

    expect(authCookie).toContain(expectedToken);
    expect(authCookie).toContain(expectedExpirationTime);
  });
});

describe('POST /user/authorize', () => {
  beforeEach(async () => {
    await UserModel.deleteMany({});
  });

  it('Should authorize user with valid token', async () => {
    const fakeUser = getFakeUser();
    const { cookie, fakeUserId } = await generateAuthCookieAndUser(fakeUser);
    const expectedResponseBody = {
      login: fakeUser.login,
      _id: fakeUserId,
    };

    const response = await request(app)
      .get('/user/authorize')
      .withCredentials()
      .set('Cookie', cookie);

    expect(response.status).toBe(201);
    expect(JSON.stringify(response.body)).toEqual(
      JSON.stringify(expectedResponseBody),
    );
  });

  it('Should return 401, if authentication cookie is not valid', async () => {
    const fakeUser = getFakeUser();
    const user = await new UserModel(fakeUser).save();
    await user.generateAuthenticationToken();
    const invalidCookie = `token=fake;`;
    const expectedResponseStatus = 401;

    const response = await request(app)
      .get('/user/authorize')
      .withCredentials()
      .set('Cookie', invalidCookie);

    expect(response.status).toBe(expectedResponseStatus);
  });

  it('Should return 401, if request does not contain any cookies', async () => {
    const expectedResponseStatus = 401;

    const response = await request(app).get('/user/authorize');

    expect(response.status).toBe(expectedResponseStatus);
  });
});
