import { AxiosError } from 'axios';

export const generateErrorMessage = (error: AxiosError): string => {
  if (error.response && error.response.data && error.response.data.error)
    return error.response.data.error;
  if (error.message) return error.message;
  return 'Unexpected error';
};
