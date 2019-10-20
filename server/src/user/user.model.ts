import * as mongoose from 'mongoose';
import { Schema } from 'mongoose';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { User } from './user.interface';

export interface IUser extends User {
  generateAuthenticationToken: () => Promise<string>;
  isPasswordValid(password: string): Promise<boolean>;
}

const UserSchema: Schema = new Schema({
  login: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true },
  email: { type: String, unique: true, required: true, trim: true },
  tokens: [{ type: String }],
});

UserSchema.pre<IUser>('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.method('isPasswordValid', function(
  password: string,
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
});

UserSchema.method('generateAuthenticationToken', async function(): Promise<
  string
> {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET, {
    expiresIn: '7 days',
  });
  this.tokens = this.tokens.concat(token);
  await this.save();
  return token;
});

const UserModel = mongoose.model<IUser & mongoose.Document>('user', UserSchema);

export default UserModel;
