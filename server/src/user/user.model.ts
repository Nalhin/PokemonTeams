import * as mongoose from 'mongoose';
import { User } from './user.interface';

const UserSchema = new mongoose.Schema({
  login: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, trim: true },
});

const UserModel = mongoose.model<User & mongoose.Document>('user', UserSchema);

export default UserModel;
