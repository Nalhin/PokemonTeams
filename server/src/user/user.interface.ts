import * as mongoose from 'mongoose';

export interface User extends mongoose.Document {
  login: string;
  password: string;
  email: string;
  tokens: string[];
}
