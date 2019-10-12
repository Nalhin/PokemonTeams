import { Request } from 'express';
import { User } from '../user/user.interface';

export interface AuthenticationRequest extends Request {
  locals: { user: User };
}
