import { generateErrorMessage } from '../generateErrorMessage';
import {
  fakeAxiosError,
  fakeAxiosSuccessResponse,
} from '../../../test/fixtures/axios';

describe('generateErrorMessage Function', () => {
  it('Should return server error', () => {
    const errorText = 'errorText';
    const error = {
      ...fakeAxiosError,
      response: { ...fakeAxiosSuccessResponse, data: { error: errorText } },
    };

    const result = generateErrorMessage(error);

    expect(result).toBe(errorText);
  });

  it('Should return error message', () => {
    const errorMessage = 'errorMessage';
    const error = {
      ...fakeAxiosError,
      message: errorMessage,
    };

    const result = generateErrorMessage(error);

    expect(result).toBe(errorMessage);
  });

  it('Should return "Unexpected error"', () => {
    const error = fakeAxiosError;
    const resultMessage = 'Unexpected error';

    const result = generateErrorMessage(error);

    expect(result).toBe(resultMessage);
  });
});
