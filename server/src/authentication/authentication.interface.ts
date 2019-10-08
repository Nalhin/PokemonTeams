import { Request } from 'express';

export interface AuthenticationRequest extends Request {
  locals: { userId: string };
}
