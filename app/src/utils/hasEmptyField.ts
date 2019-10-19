export const hasEmptyFields = <T>(form: T) =>
  Object.values(form).some(n => n === '');
