import * as faker from 'faker';

export const getFakeUser = () => ({
  login: faker.internet.userName(),
  password: faker.internet.password(),
  email: faker.internet.email(),
});
