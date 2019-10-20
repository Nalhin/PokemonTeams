import { hasEmptyFields } from '../hasEmptyField';

describe('hasEmptyFields Function', () => {
  it('Should return true if form has empty fields', () => {
    const form = {
      login: 'login',
      password: 'password',
      email: '',
    };

    const result = hasEmptyFields(form);

    expect(result).toBeTruthy();
  });

  it('Should return false if form doesnt have empty fields', () => {
    const form = {
      login: 'login',
      password: 'password',
      email: 'email',
    };

    const result = hasEmptyFields(form);

    expect(result).toBeFalsy();
  });
});
